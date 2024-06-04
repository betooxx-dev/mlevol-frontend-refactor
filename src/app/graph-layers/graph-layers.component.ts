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

  allModules: NodeEditor<Schemes>;
  subscription: Subscription | undefined;
  constructor(
    private graphService: GraphEditorService,
    private focusService: PanelFocusService) {
    this.graphService = graphService;
    this.allModules = graphService.modules;
  }

  ngOnInit(): void {
    this.subscription = this.graphService.anyChange.subscribe((message) => {
      this.allModules = this.graphService.modules;
      console.log(this.allModules);
    });
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.focusService.mouseOver(this);
  }

  keyEvent(event: KeyboardEvent){
    console.log("Event handled from graph layers: " + event.key);
  }

}
