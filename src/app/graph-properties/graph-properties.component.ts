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
    if (event.key === 'Delete' && this.allNode) {
      this.deleteNode();
    }
  }

  updateValue(key: string, value: any) {
    this.allNode!.info.inputs[key].value = value;
    console.log(this.allNode);
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
