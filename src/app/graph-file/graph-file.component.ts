import { TemplateDialogComponent } from './template-dialog/template-dialog.component';
import { GraphEditorService } from './../graph-editor.service';
import { Component, OnDestroy} from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-graph-file',
  templateUrl: './graph-file.component.html',
  styleUrl: './graph-file.component.css',
  providers: [DialogService]
})
export class GraphFileComponent {

  ref: DynamicDialogRef | undefined;

  constructor(public graphEditorService: GraphEditorService, public dialogService: DialogService){
  }

  async importPipeline(){
    const graphEditorService = this.graphEditorService
    var element = document.createElement('div');
    element.innerHTML = '<input type="file" accept=".json">';
    var fileInput = element.firstChild as any;
    // console.log(fileInput);
    fileInput!.addEventListener('change', async function() {
        // console.log(fileInput!.files);
        var file = fileInput!.files[0];
        var reader = new FileReader();
        reader.onload = async function() {
            await graphEditorService.cleanEditor();
            await graphEditorService.loadEditor(JSON.parse(reader.result as string));
        };
        reader.readAsText(file);
    });
    fileInput.click();
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
