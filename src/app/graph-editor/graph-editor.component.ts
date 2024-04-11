import { MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, Injector, ViewChild } from '@angular/core'
import { GraphEditorService } from '../graph-editor.service';
import { Observable } from 'rxjs';

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

  constructor(
    private injector: Injector,
    private graphEditorService: GraphEditorService,
    public dialog: MatDialog) { 
      //window.addEventListener("beforeunload", beforeUnloadHandler); FIXME
    }

  @HostListener('document:keyup', ['$event'])
  keyEvent(event: KeyboardEvent){
    if (event.key === ' ' && this.showPopup === false) {
      this.showPopup = true;
      this.openDialog();
    }
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.showPopup = false;
      if (result!="") {
        this.graphEditorService.addNode(result); 
      }
      
    });
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
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './add-node-dialog.html',
  styleUrl: './add-node-dialog.css',
})
export class DialogComponent {
  availableNodes: string[] = [];

  constructor(private graphEditorService: GraphEditorService) {
    graphEditorService.getAvailableNodes().then((nodes) => {
      this.availableNodes = nodes;
    }
    );
  }

}