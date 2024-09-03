import { GraphEditorService } from './../graph-editor.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-graph-file',
  templateUrl: './graph-file.component.html',
  styleUrl: './graph-file.component.css'
})
export class GraphFileComponent {
  items : any[] = []

  constructor(public graphEditorService: GraphEditorService){
    this.items = [
      {
        label: "Empty",
        command : async () => {
          await graphEditorService.cleanEditor();
          graphEditorService.homeZoom();
          graphEditorService.arrangeNodes();
          }

      },
      {
        label: "Template",
        command : () => {
          graphEditorService.cleanModules();
          graphEditorService.homeZoom();
          graphEditorService.arrangeNodes();
          }
      },
      {
        label: "Import",
        command : () => {
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
      }
    ]
  }

  generateCode(){
    this.graphEditorService.generateAndDownloadCode();
  }

  downloadEditor(){
    this.graphEditorService.generateJsonOfEditor();
  }
}
