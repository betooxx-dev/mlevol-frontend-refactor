import { Subscription } from 'rxjs';
import { Schemes } from './../editor';
import { Component, HostListener } from '@angular/core';
import { GraphEditorService } from '../graph-editor.service';
import { NodeEditor } from 'rete';
import { PanelFocusService } from '../panel-focus.service';

@Component({
  selector: 'app-graph-layers',
  templateUrl: './graph-layers.component.html',
  styleUrl: './graph-layers.component.css'
})
export class GraphLayersComponent {

  allModules : any;
  modulesKeys : any;
  modulesNames : any;
  subscription: Subscription | undefined;
  constructor(
    private graphService: GraphEditorService,
    private focusService: PanelFocusService) {
    this.graphService = graphService;
    this.allModules = graphService.modules;
  }

  ngOnInit(): void {
    this.subscription = this.graphService.anyChange.subscribe((message) => {
      this.allModules = {};
      this.modulesKeys = [];
      this.modulesNames = {};
      this.allModules = this.graphService.modules;
      let moduleIds = Object.keys(this.allModules);
      // delete root from modulesKeys
      moduleIds.splice(moduleIds.indexOf('root'), 1);
      this.modulesKeys = moduleIds;
      this.modulesNames = {};
      for (let module in moduleIds) {
        for (let node of this.allModules["root"].nodes) {
          if (node.id == moduleIds[module]) {
            this.modulesNames[moduleIds[module]] = node.data.params.description.value;
          }
        }
      }

    });
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.focusService.mouseOver(this);
  }

  keyEvent(event: KeyboardEvent){
    console.log("Event handled from graph layers: " + event.key);
  }

  toggleModule(module: string) {
    console.log("Toggling module: " + module);
  }

  toggleNode(node: any) {
    console.log("Toggling node: " + node.name);
  }

}
