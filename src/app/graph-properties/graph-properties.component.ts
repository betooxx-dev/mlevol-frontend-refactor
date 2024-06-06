import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { GraphEditorService } from '../graph-editor.service';
import { Node } from '../editor';
import { ModuleNode, ParameterNode } from '../nodes';
import {InputOptions, MultipleOptions, ParamOptions} from "../dropbox.options";
import { PanelFocusService } from '../panel-focus.service';
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
  moduleNodeName = ModuleNode.nodeName;
  options = InputOptions;
  options_of_options = MultipleOptions;
  paramOptions = ParamOptions;
  nodeParamOptions : [] | any;

  constructor(
    private data : GraphEditorService,
    private focusService : PanelFocusService
  ){
    this.subscription = this.data.selectedSource.subscribe(async (message) => {
      if (message == "") return;
      this.openProperties();
      this.allNode = await this.data.getNode(message);
      this.selectedNode = this.allNode.label;
      this.nodeInfo = this.allNode.info;
      this.nodeInputKeys = this.nodeInfo.inputs ? Object.keys(this.nodeInfo.inputs) : [];
      let availableParameters = await this.data.getParameterNodes();
      this.nodeParamOptions = [];
      for (let i = 0; i < availableParameters.length; i++) {
        let param = availableParameters[i] as ParameterNode;
        this.nodeParamOptions.push(
          {
            label : param.info.inputs.description.value,
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
    if (typeof value != "string")
    {
      this. allNode!.info.inputs[key][field] = value.value;
    }else{
      this.allNode!.info.inputs[key][field] = value;
    }
    console.log(this.allNode);
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
