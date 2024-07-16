import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { GraphEditorService } from '../graph-editor.service';
import { Node } from '../editor';
import { ParameterNode } from '../nodes';

import OptionsJSON from '../../assets/options.json';
import {ParamOptions} from "../dropbox.options";
import { PanelFocusService } from '../panel-focus.service';
import { ConfigurationService } from '../configuration.service';
@Component({
  selector: 'app-graph-properties',
  templateUrl: './graph-properties.component.html',
  styleUrl: './graph-properties.component.css'
})
export class GraphPropertiesComponent implements OnInit {

  @Output() propertiesClose = new EventEmitter<boolean>();

  selectedNode : string = "";
  allNode : Node | undefined;
  nodeInfo : any;
  nodeInputKeys : any;
  colors : [] = [];
  subscription : Subscription | undefined;
  moduleNodeName = "Step";
  options:any = OptionsJSON.options;
  options_of_options:any = OptionsJSON.option_of_options;

  paramOptions = ParamOptions;
  nodeParamOptions : [] | any;
  constructor(
    private data : GraphEditorService,
    private focusService : PanelFocusService,
  ){
    this.subscription = this.data.selectedSource.subscribe(async (message) => {
      if (message == "") return;
      this.openProperties();
      this.allNode = await this.data.getNode(message);
      this.selectedNode = this.allNode.label;
      this.nodeInfo = this.allNode.params;
      this.nodeInputKeys = this.nodeInfo ? Object.keys(this.nodeInfo) : [];
      let availableParameters = await this.data.getParameterNodes();
      this.nodeParamOptions = [];
      for (let i = 0; i < availableParameters.length; i++) {
        let param = availableParameters[i] as ParameterNode;
        this.nodeParamOptions.push(
          {
            label : param.params.description.value,
            value : param.id
          });
      }
    });
  }

  ngOnInit() {
    
  }

  ngOnChanges(): void {
    this.allNode = this.data.getNode(this.selectedNode);
    if (this.allNode == undefined) this.closeProperties();
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.focusService.mouseOver(this);
  }

  keyEvent(event: KeyboardEvent){

    if (event.key === 'Escape') {
      this.closeProperties();
    }
  }

  updateValue(key: string, value: any, field: string = "value") {
    if (typeof value != "string") {
      this. allNode!.params[key][field] = value.value;
    } else{
      this.allNode!.params[key][field] = value;
    }

    this.allNode!.update();
    this.data.updateNode(this.allNode!);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  closeProperties(){
    this.propertiesClose.emit(true);
    this.data.unselectNodes();
  }

  openProperties(){
    this.propertiesClose.emit(false);
  }

  showEditor(){
    this.data.generateJsonOfEditor();
  }

  changeEditor(){
    if (this.allNode == undefined) return;
    this.data.changeEditor(this.allNode!, true);
    this.closeProperties();
    
  }
}
