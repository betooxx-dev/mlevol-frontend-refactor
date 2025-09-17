import {
  Component,
  ElementRef,
  HostListener,
  Injector,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MenuItem } from "primeng/api";
import { Subscription } from "rxjs";
import {
  GraphEditorService,
  PanelFocusService,
  ConfigurationService,
} from "@app/core";
import { ModuleNode } from "../../models/nodes";
import { Node } from "../../editor";

const beforeUnloadHandler = (event: {
  preventDefault: () => void;
  returnValue: boolean;
}) => {
  event.preventDefault();
  event.returnValue = true;
};

@Component({
  selector: "app-graph-editor",
  templateUrl: "./graph-editor.component.html",
  styleUrl: "./graph-editor.component.css",
})
export class GraphEditorComponent implements OnInit {
  @ViewChild("rete") container!: ElementRef<HTMLElement>;
  showMap: boolean = true;
  moduleImIn: string = "General Editor";
  showConfirmArrange: boolean = false;
  subscription: Subscription;
  allNode: Node | undefined;
  copyNode: Node | undefined;
  subscriptionNode: Subscription;
  items: MenuItem[];
  last_selected_node: string = "";
  constructor(
    private injector: Injector,
    private graphEditorService: GraphEditorService,
    private focusService: PanelFocusService,
    private configService: ConfigurationService
  ) {
    window.addEventListener("beforeunload", beforeUnloadHandler);

    this.subscription = this.graphEditorService.selectedEditor.subscribe(
      (message) => {
        this.moduleImIn = message;
      }
    );

    this.subscriptionNode = this.graphEditorService.selectedSource.subscribe(
      (message) => {
        if (message == "") {
          this.allNode = undefined;
          this.last_selected_node = "";
          return;
        }

        if (message == this.last_selected_node) return;
        this.last_selected_node = message;
        this.allNode = this.graphEditorService.getNode(message);
      }
    );

    this.items = [];
  }

  async ngOnInit() {
    await this.configService.waitForFetch();
    const availableNodes = this.graphEditorService.getAvailableNodes();
    for (const value of availableNodes.keys()) {
      let items = [];
      for (const item of availableNodes.get(value)!) {
        items.push({
          label: item,
          command: () => {
            this.graphEditorService.addNode(item);
          },
        });
      }
      this.items.push({
        label: value,
        items,
      });
    }
  }

  async ngAfterViewInit() {
    await this.graphEditorService.createEditor(
      this.container.nativeElement,
      this.injector
    );
    await this.graphEditorService.homeZoom();
  }

  save(severity: string) {
    // console.log(severity);
  }

  addStage() {
    this.graphEditorService.addNode("Step");
  }

  @HostListener("mouseenter") onMouseEnter() {
    this.focusService.mouseOver(this);
  }

  async keyEvent(event: KeyboardEvent) {
    if (event.key === "Delete" && this.allNode) this.deleteNode();

    if (event.key === "c" && event.ctrlKey && this.allNode)
      this.copyNode = this.allNode;

    if (event.key === "x" && event.ctrlKey && this.allNode) {
      this.copyNode = this.allNode;
      this.deleteNode();
    }

    if (event.key === "v" && event.ctrlKey && this.copyNode) {
      this.graphEditorService.addNode(
        this.copyNode.getNodeName(),
        undefined,
        JSON.parse(JSON.stringify(this.copyNode.data()))
      );
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
      this.container.nativeElement.classList.remove("hide-minimap");
    } else {
      this.container.nativeElement.classList.add("hide-minimap");
    }
  }

  async arrangeNodes() {
    await this.graphEditorService.arrangeNodes();
  }

  backToRoot() {
    let node = new ModuleNode();
    node.id = "root";
    node.setName("General Editor");
    this.graphEditorService.changeEditor(node.id, true);
  }

  deleteNode() {
    this.graphEditorService.deleteNode(this.allNode!.id);
    this.allNode = undefined;
  }
}
