#!/bin/bash

# =============================================================================
# SCRIPT DE MIGRACIÓN DE IMPORTS - MLS TOOLBOX FRONTEND  
# =============================================================================
# Convierte imports relativos (../../) a path aliases (@app/, @core/, etc.)
# =============================================================================

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date +'%H:%M:%S')] $1${NC}"
}

info() {
    echo -e "${BLUE}[INFO] $1${NC}"
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
}

# Directorio de trabajo
SRC_DIR="src/app"
PROCESSED_FILES=0
TOTAL_REPLACEMENTS=0

if [ ! -d "$SRC_DIR" ]; then
    error "No se encontró el directorio src/app. Ejecuta desde la raíz del proyecto Angular."
    exit 1
fi

log "🔄 Iniciando migración de imports a path aliases..."

# Función para procesar archivos TypeScript
process_typescript_files() {
    local pattern=$1
    local replacement=$2
    local description=$3
    
    info "Procesando: $description"
    
    # Buscar archivos .ts que contengan el patrón
    local files_found=$(find "$SRC_DIR" -name "*.ts" -exec grep -l "$pattern" {} \; 2>/dev/null || true)
    
    if [ -z "$files_found" ]; then
        info "No se encontraron archivos con el patrón: $pattern"
        return 0
    fi
    
    local count=0
    while IFS= read -r file; do
        if [ -f "$file" ]; then
            # Hacer backup del archivo
            cp "$file" "$file.bak"
            
            # Aplicar reemplazo usando sed
            if sed -E "$replacement" "$file.bak" > "$file"; then
                local changes=$(diff -q "$file.bak" "$file" > /dev/null || echo "changed")
                if [ "$changes" = "changed" ]; then
                    count=$((count + 1))
                    info "  ✓ Actualizado: $file"
                fi
            else
                error "Error procesando: $file"
                mv "$file.bak" "$file"  # Restaurar backup
            fi
            
            # Limpiar backup si todo salió bien
            rm -f "$file.bak"
        fi
    done <<< "$files_found"
    
    if [ $count -gt 0 ]; then
        log "$count archivos actualizados para: $description"
        TOTAL_REPLACEMENTS=$((TOTAL_REPLACEMENTS + count))
    fi
}

# Patrones de reemplazo
# Nota: Los patrones están ordenados de más específico a menos específico

log "📝 Aplicando transformaciones de imports..."

# 1. Core services (../../../core/ -> @core/)
process_typescript_files \
    'from ['\''"][\.\/]*core/' \
    's|from ['\''"](\.\./)*core/|from "@core/|g' \
    "Core services imports"

# 2. Features imports (../../../features/ -> @features/)
process_typescript_files \
    'from ['\''"][\.\/]*features/' \
    's|from ['\''"](\.\./)*features/|from "@features/|g' \
    "Features imports"

# 3. Shared components (../../../shared/ -> @shared/)
process_typescript_files \
    'from ['\''"][\.\/]*shared/' \
    's|from ['\''"](\.\./)*shared/|from "@shared/|g' \
    "Shared components imports"

# 4. Layout components (../../../layout/ -> @layout/)
process_typescript_files \
    'from ['\''"][\.\/]*layout/' \
    's|from ['\''"](\.\./)*layout/|from "@layout/|g' \
    "Layout components imports"

# 5. App root level imports (../../app/ -> @app/)  
process_typescript_files \
    'from ['\''"][\.\/]*app/' \
    's|from ['\''"](\.\./)*app/|from "@app/|g' \
    "App root level imports"

# 6. Environment imports (../../environments/ -> @environments/)
process_typescript_files \
    'from ['\''"][\.\/]*environments/' \
    's|from ['\''"](\.\./)*environments/|from "@environments/|g' \
    "Environment imports"

# Estadísticas finales
log "✅ Migración completada"
echo ""
echo -e "${BLUE}📊 ESTADÍSTICAS:${NC}"
echo "   Archivos procesados: $TOTAL_REPLACEMENTS"
echo "   Directorio: $SRC_DIR"
echo ""

# Verificar que la compilación sigue funcionando
log "🔍 Verificando que la compilación funcione..."

if command -v ng >/dev/null 2>&1; then
    info "Ejecutando ng build para verificar imports..."
    if ng build --configuration development > build_check.log 2>&1; then
        log "✅ Compilación exitosa - todos los imports funcionan correctamente"
        rm -f build_check.log
    else
        warning "❌ Error de compilación detectado. Revisa build_check.log"
        error "Algunos imports pueden necesitar ajuste manual"
        echo ""
        echo -e "${YELLOW}Errores comunes y soluciones:${NC}"
        echo "1. Import circular: Reorganiza las dependencias"
        echo "2. Archivo no encontrado: Verifica que la ruta del path alias sea correcta"
        echo "3. Módulo no exportado: Añade export al index.ts correspondiente"
    fi
else
    warning "Angular CLI no encontrado. Verifica manualmente que la compilación funcione."
fi

echo ""
log "🚀 Para usar los nuevos path aliases, importa así:"
echo -e "${GREEN}   import { MyService } from '@core/services/my-service';${NC}"
echo -e "${GREEN}   import { MyComponent } from '@features/my-feature/components/my-component';${NC}"
echo -e "${GREEN}   import { MySharedComponent } from '@shared/components/my-shared';${NC}"

echo ""
info "¡Tu IDE debería reconocer automáticamente los nuevos path aliases!"

# Opcional: Buscar imports relativos restantes
remaining_relative=$(find "$SRC_DIR" -name "*.ts" -exec grep -l "from ['\"]\.\./" {} \; 2>/dev/null | wc -l)
if [ "$remaining_relative" -gt 0 ]; then
    warning "⚠️  Aún quedan $remaining_relative archivos con imports relativos"
    echo "   Ejecuta: grep -r \"from ['\\\"]\\.\\.\" src/app para encontrarlos"
fi