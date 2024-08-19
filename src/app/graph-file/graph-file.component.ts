import { GraphEditorService } from './../graph-editor.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-graph-file',
  templateUrl: './graph-file.component.html',
  styleUrl: './graph-file.component.css'
})
export class GraphFileComponent {
  items : any[] = []

  constructor(graphEditorService: GraphEditorService){
    this.items = [
      {
        label: "Empty",
        command : () => {
          graphEditorService.cleanModules();
          }

      },
      {
        label: "Template",
        command : () => {
          graphEditorService.cleanModules();
          }
      },
      {
        label: "Import",
        command : () => {
          graphEditorService.cleanModules();
          }
      }
    ]
  }
}
