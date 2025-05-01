import { TemplateDialogComponent } from './template-dialog/template-dialog.component';
import { GraphEditorService } from './../graph-editor.service';
import { Component, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-graph-file',
  templateUrl: './graph-file.component.html',
  styleUrl: './graph-file.component.css',
  providers: [DialogService]
})
export class GraphFileComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  ref: DynamicDialogRef | undefined;

  constructor(public graphEditorService: GraphEditorService, public dialogService: DialogService){

  }

  async importPipeline(){
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0){
      const file: File = target.files[0]; // Get the first file
      const reader = new FileReader();
      reader.onload = () => {
        let fileContent = reader.result as string;
        // Execute your code here
        this.processFileContent(fileContent);
      };
      reader.readAsText(file);
      target.value = ''
    }
  }

  async processFileContent(content: string) {
    await this.clearEditor();
    await this.graphEditorService.loadEditor(JSON.parse(content));
  }

  async clearEditor(){

    await this.graphEditorService.cleanEditor();
    await this.graphEditorService.homeZoom();
    await this.graphEditorService.arrangeNodes();

  }

  generateCode(){
    this.graphEditorService.generateAndDownloadCode();
  }

  downloadEditor(){
    this.graphEditorService.generateJsonOfEditor();
  }

  showTemplates(){
    this.ref = this.dialogService.open(TemplateDialogComponent, {
        header: 'Select a Template',
        width: '20vw',
        contentStyle: { overflow: 'auto' },
        breakpoints: {
            '960px': '75vw',
            '640px': '90vw'
        }
    });

    this.ref.onClose.subscribe(async (path: string) => {
      if (path) {
        await this.graphEditorService.loadTemplate(path);
      }
    })
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }
}
