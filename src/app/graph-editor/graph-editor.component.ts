import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Injector, Input, Output, ViewChild } from '@angular/core'
import { GraphEditorService } from '../graph-editor.service';
import { Subscription } from 'rxjs';
import { ModuleNode } from '../nodes';
import { PanelFocusService } from '../panel-focus.service';
import { Node } from '../editor';

const beforeUnloadHandler = (event: { preventDefault: () => void; returnValue: boolean; }) => {
  // Recommended
  event.preventDefault(); 

  // Included for legacy support, e.g. Chrome/Edge < 119
  event.returnValue = true;
};

@Component({
  selector: 'app-graph-editor',
  templateUrl: './graph-editor.component.html',
  styleUrl: './graph-editor.component.css',
})
export class GraphEditorComponent {
  @ViewChild('rete') container!: ElementRef<HTMLElement>;
  showMap: boolean = true;
  moduleImIn: string = 'General Editor';
  showPopup: boolean = false;
  showConfirmArrange: boolean = false;
  subscription: Subscription;
  allNode: Node | undefined;
  copyNode: Node | undefined;
  subscriptionNode: Subscription;
  showPopUp: boolean = false;

  constructor(
    private injector: Injector,
    private graphEditorService: GraphEditorService,
    private focusService: PanelFocusService) { 
      //window.addEventListener("beforeunload", beforeUnloadHandler); FIXME
      this.subscription = this.graphEditorService.selectedEditor.subscribe((message) => {
        this.moduleImIn = message;
      } );
      this.subscriptionNode = this.graphEditorService.selectedSource.subscribe((message) => {
        if (message == "") return;
        this.allNode = this.graphEditorService.getNode(message);
      });
    }

  async ngAfterViewInit() {
    await this.graphEditorService.createEditor(this.container.nativeElement,this.injector);
    await this.graphEditorService.homeZoom();
  }

  closePopUp() {
    this.showPopUp = false;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.focusService.mouseOver(this);
  }

  keyEvent(event: KeyboardEvent) {
    if (event.key === ' ' && event.shiftKey) {
      this.showPopUp = true;
    }
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
      this.graphEditorService.addNode(this.copyNode.getNodeName(), undefined, JSON.parse(JSON.stringify(this.copyNode.data())));
      this.copyNode = undefined;
    }
  }

  async zoomIn() {
    await this.graphEditorService.zoomIn();
  }

  async zoomOut() {
    await this.graphEditorService.zoomOut();
  }

  async homeZoom() {
    await this.graphEditorService.homeZoom();
  }

  async toggleMap() {
    this.showMap = !this.showMap;
    if (this.showMap) {
      this.container.nativeElement.classList.remove('hide-minimap');
    } else {
      this.container.nativeElement.classList.add('hide-minimap');
    }
  }

  async arrangeNodes() {
    await this.graphEditorService.arrangeNodes();
  }

  backToRoot(){
    let node = new ModuleNode("root");
    node.id = "root";
    node.info.inputs.description.value = "General Editor";
    this.graphEditorService.changeEditor(node, true);
  }

  deleteNode(){
    this.graphEditorService.deleteNode(this.allNode!.id);
    this.allNode = undefined;
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './add-node-dialog.html',
  styleUrl: './add-node-dialog.css',
})
export class DialogComponent {
  availableNodes: Map<string, string[]> = new Map<string, string[]>();
  availableCategories : string[] = [];
  @Input() visible: boolean = false;
  @Output() addedNode: EventEmitter<boolean> = new EventEmitter<boolean>();
  showTip: boolean = true;
  constructor(
    private graphEditorService: GraphEditorService,
    private focusService: PanelFocusService) {
    this.availableNodes = this.graphEditorService.getAvailableNodes();
    for(const value of this.availableNodes.keys()){
      this.availableCategories.push(value);
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.focusService.mouseOver(this);
  }

  keyEvent(event: KeyboardEvent){
    
  }

  addNode(nodeName :string) {
    this.showTip = false;
    this.graphEditorService.addNode(nodeName);
    this.closeAddDialog();
  }

  closeAddDialog() {
    this.addedNode.emit(false);
  }



}