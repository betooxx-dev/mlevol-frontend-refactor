import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { GraphEditorService } from '../graph-editor.service';
import { Node } from '../editor';
@Component({
  selector: 'app-graph-properties',
  templateUrl: './graph-properties.component.html',
  styleUrl: './graph-properties.component.css'
})
export class GraphPropertiesComponent implements OnInit {

  @Output() propertiesClose = new EventEmitter<boolean>();

  selectedNode: string = "";
  allNode: Node | undefined;
  nodeInfo : any;
  nodeInputKeys : any;
  copyNode : Node | undefined;
  colors: [] | any;
  subscription: Subscription | undefined;

  constructor(private data : GraphEditorService){
  }

  ngOnInit(): void {
    this.subscription = this.data.selectedSource.subscribe((message) => {
      if (message == "") return;
      this.openProperties();
      this.allNode = this.data.getNode(message);
      this.selectedNode = this.allNode.label;
      this.nodeInfo = this.allNode.info;
      this.nodeInputKeys = this.nodeInfo.inputs ? Object.keys(this.nodeInfo.inputs) : [];
    });
  }

  @HostListener('document:keyup', ['$event'])
  keyEvent(event: KeyboardEvent){
    console.log(event);
    if (event.key === 'Delete' && this.allNode) {
      this.deleteNode();
    }

    if (event.key === 'c' && event.ctrlKey && this.allNode) {
      this.copyNode = this.allNode;
    }

    if (event.key === 'x' && event.ctrlKey && this.allNode) {
      this.copyNode = this.allNode;
      this.deleteNode();
    }

    if (event.key === 'v' && event.ctrlKey && this.copyNode) {
      let a =  this.copyNode;
      let b = a.constructor;
      this.data.addNode(this.copyNode.getNodeName(), undefined, this.copyNode.data());
    }

    if (event.key === 'Escape') {
      this.closeProperties();
    }
  }

  updateValue(key: string, value: any) {
    if (typeof value != "string")
    {
      this. allNode!.info.inputs[key].value = value.value.key;
    }else{
      this.allNode!.info.inputs[key].value = value;
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

  deleteNode(){
    this.data.deleteNode(this.allNode!.id);
    this.allNode = undefined;
    this.selectedNode = "";
    this.closeProperties();
  }

  showEditor(){
    this.data.generateJsonOfEditor();
  }
}
