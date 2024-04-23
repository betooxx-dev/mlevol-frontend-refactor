import { Component } from '@angular/core';
import { GraphEditorService } from '../graph-editor.service';

@Component({
  selector: 'app-graph-settings',
  templateUrl: './graph-settings.component.html',
  styleUrl: './graph-settings.component.css'
})
export class GraphSettingsComponent {
  data : GraphEditorService;

  constructor(
    data: GraphEditorService
  ){
    this.data = data;
  }

  downloadEditor(){
    this.data.generateJsonOfEditor();
  }

}
