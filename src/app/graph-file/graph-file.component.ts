import { GraphEditorService } from './../graph-editor.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-graph-file',
  templateUrl: './graph-file.component.html',
  styleUrl: './graph-file.component.css'
})
export class GraphFileComponent {

  constructor(public graphEditorService: GraphEditorService){
  }

  importPipeline(){
    let graphEditorService = this.graphEditorService
    var element = document.createElement('div');
    element.innerHTML = '<input type="file" accept=".json">';
    var fileInput = element.firstChild as any;
    console.log(fileInput);
    fileInput!.addEventListener('change', function() {
        console.log(fileInput!.files);
        var file = fileInput!.files[0];
        var reader = new FileReader();
        reader.onload = function() {
            graphEditorService.loadEditor(reader.result as string);
        };
        reader.readAsText(file);
    });
    fileInput.click();
    graphEditorService.cleanModules();
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
}
