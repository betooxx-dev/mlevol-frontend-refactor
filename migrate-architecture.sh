#!/bin/bash

echo "🚀 Iniciando migración a arquitectura escalable de Angular"

# Crear estructura de directorios
echo "📁 Creando estructura de directorios..."
mkdir -p src/app/core/services
mkdir -p src/app/shared/components
mkdir -p src/app/shared/utils
mkdir -p src/app/features/home/components
mkdir -p src/app/features/graph-editor/components
mkdir -p src/app/features/graph-editor/models
mkdir -p src/app/features/code-assessment/components
mkdir -p src/app/layout

# Fase 1: Mover servicios a core
echo "🔄 Moviendo servicios a core..."
[ -f "src/app/configuration.service.ts" ] && mv src/app/configuration.service.ts src/app/core/services/
[ -f "src/app/graph-editor.service.ts" ] && mv src/app/graph-editor.service.ts src/app/core/services/
[ -f "src/app/panel-focus.service.ts" ] && mv src/app/panel-focus.service.ts src/app/core/services/

# Mover utils
echo "🔧 Moviendo utilidades..."
[ -f "src/app/utils.ts" ] && mv src/app/utils.ts src/app/shared/utils/

# Mover componentes compartidos
echo "📦 Moviendo componentes compartidos..."
[ -d "src/app/header" ] && mv src/app/header src/app/shared/components/
[ -d "src/app/small-header" ] && mv src/app/small-header src/app/shared/components/
[ -d "src/app/feature-button" ] && mv src/app/feature-button src/app/shared/components/

# Mover componentes de home
echo "🏠 Organizando módulo home..."
[ -d "src/app/home" ] && mv src/app/home src/app/features/home/components/
[ -d "src/app/about" ] && mv src/app/about src/app/features/home/components/

# Mover componentes de graph-editor
echo "📊 Organizando módulo graph-editor..."
[ -d "src/app/graph" ] && mv src/app/graph src/app/features/graph-editor/components/
[ -d "src/app/graph-editor" ] && mv src/app/graph-editor src/app/features/graph-editor/components/
[ -d "src/app/graph-file" ] && mv src/app/graph-file src/app/features/graph-editor/components/
[ -d "src/app/graph-layers" ] && mv src/app/graph-layers src/app/features/graph-editor/components/
[ -d "src/app/graph-menu" ] && mv src/app/graph-menu src/app/features/graph-editor/components/
[ -d "src/app/graph-properties" ] && mv src/app/graph-properties src/app/features/graph-editor/components/
[ -d "src/app/custom-node" ] && mv src/app/custom-node src/app/features/graph-editor/components/
[ -d "src/app/custom-socket" ] && mv src/app/custom-socket src/app/features/graph-editor/components/
[ -d "src/app/custom-connection" ] && mv src/app/custom-connection src/app/features/graph-editor/components/
[ -d "src/app/custom-background" ] && mv src/app/custom-background src/app/features/graph-editor/components/
[ -d "src/app/focus-handler" ] && mv src/app/focus-handler src/app/features/graph-editor/components/

# Mover modelos
[ -d "src/app/nodes" ] && mv src/app/nodes src/app/features/graph-editor/models/
[ -d "src/app/sockets" ] && mv src/app/sockets src/app/features/graph-editor/models/

# Mover componentes de code-assessment
echo "🔍 Organizando módulo code-assessment..."
[ -d "src/app/code-assess" ] && mv src/app/code-assess src/app/features/code-assessment/components/
[ -d "src/app/code-assess-fetching" ] && mv src/app/code-assess-fetching src/app/features/code-assessment/components/
[ -d "src/app/code-assess-response" ] && mv src/app/code-assess-response src/app/features/code-assessment/components/

# Mover environments
echo "🌍 Moviendo configuración de ambientes..."
[ -d "src/app/environments" ] && mv src/app/environments src/

# Mover archivos sueltos que puedan ser específicos
echo "📋 Organizando archivos específicos..."
[ -f "src/app/editor.ts" ] && mv src/app/editor.ts src/app/features/graph-editor/
[ -f "src/app/dropbox.options.ts" ] && mv src/app/dropbox.options.ts src/app/features/graph-editor/

echo "✅ Migración de archivos completada!"
echo "🔄 Siguiente paso: Actualizar imports en los módulos"
echo "📖 Consulta el plan de migración para los siguientes pasos"