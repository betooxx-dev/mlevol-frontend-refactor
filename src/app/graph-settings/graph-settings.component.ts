import { Component } from '@angular/core';
import { GraphEditorService } from '../graph-editor.service';
import { ModuleNode } from '../nodes';

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

  onFileLoad(event : any) {
    const f = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = ((theFile) => {
      return (e) => {
        try {
          if (e.target == null || e.target.result == null) {
            alert('e.target or e.target.result is null');
            return;
          }
          this.data.loadEditor(e.target.result as string);
        } catch (ex) {
          alert('exception when trying to parse json = ' + ex);
        }
      };
    })(f);
    reader.readAsText(f);
  }

}
