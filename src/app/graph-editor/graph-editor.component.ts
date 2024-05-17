import { Component, ElementRef, HostListener, Injector, ViewChild } from '@angular/core'
import { GraphEditorService } from '../graph-editor.service';
import { Subscription } from 'rxjs';

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
  subscription: Subscription | undefined;

  constructor(
    private injector: Injector,
    private graphEditorService: GraphEditorService) { 
      //window.addEventListener("beforeunload", beforeUnloadHandler); FIXME
      this.subscription = this.graphEditorService.selectedEditor.subscribe((message) => {
        this.moduleImIn = message;
      } );
    }

  async ngAfterViewInit() {
    await this.graphEditorService.createEditor(this.container.nativeElement,this.injector);
    await this.graphEditorService.homeZoom();
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
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './add-node-dialog.html',
  styleUrl: './add-node-dialog.css',
})
export class DialogComponent {
  availableNodes: Map<string, string[]> = new Map<string, string[]>();
  availableCategories : string[] = [];
  openSections : number | number[] = [];
  visible: boolean = false;
  showTip: boolean = true;
  constructor(private graphEditorService: GraphEditorService) {
    this.availableNodes = this.graphEditorService.getAvailableNodes();
    for(const value of this.availableNodes.keys()){
      this.availableCategories.push(value);
    }
  }

  activeIndexChange(index: number | number[]) {
    this.openSections= index;
  }

  @HostListener('document:keyup', ['$event'])
  keyEvent(event: KeyboardEvent){
    if (event.key === ' ' && event.shiftKey) {
      this.visible = true;
    }
  }

  addNode(nodeName :string) {
    this.showTip = false;
    this.graphEditorService.addNode(nodeName);
    this.closeAddDialog();
    console.log(this);
  }

  showAddDialog() {
    this.visible = true;
  }

  closeAddDialog() {
    this.activeIndexChange([]);
    this.visible = false;
  }

}