import { AddNode, InputNode, ModuleNode, NumberNode, OutputNode} from './nodes';
// graph-editor.service.ts
import { Injectable, OnChanges } from '@angular/core';
import { Schemes, Connection, Node} from './editor';

import { ClassicPreset as Classic,  NodeEditor } from 'rete';
import { Area, Area2D, AreaExtensions, AreaPlugin } from 'rete-area-plugin';
import { Injector } from '@angular/core'
import {
  AngularPlugin,
  AngularArea2D,
  Presets as AngularPresets,
} from 'rete-angular-plugin/17';

import {
  ConnectionPlugin,
  Presets as ConnectionPresets,
} from 'rete-connection-plugin';

import { ConnectionPathPlugin } from "rete-connection-path-plugin";

import { MinimapExtra, MinimapPlugin } from "rete-minimap-plugin";
import { CustomNodeComponent } from './custom-node/custom-node.component';
import { CustomSocketComponent } from './custom-socket/custom-socket.component';
import { CustomConnectionComponent } from './custom-connection/custom-connection.component';
import { BehaviorSubject, connect } from 'rxjs';
import { JoinNode } from './nodes/join';
import { LoadDatasetNode } from './nodes/load_dataset';
import { SelectNode } from './nodes/select';
import { ReplaceNaNNode } from './nodes/replace_NaN';
import { SplitTrainTestNode } from './nodes/split_train_test';
import { ReplaceNullNode } from './nodes/replace_Null';
import { AutoArrangePlugin, Presets as ArrangePresets } from "rete-auto-arrange-plugin";
import { saveAs } from 'file-saver';


type AreaExtra = Area2D<Schemes> | AngularArea2D<Schemes>  | MinimapExtra;

export  function accumulateOnCtrl(): { active(): boolean; destroy(): void;
} { 
    function active() {
      return false;
  }

  function destroy() {
  }
  return {
    active,
    destroy
  };
};

@Injectable({
  providedIn: 'root'
})
export class GraphEditorService {
  editor  : NodeEditor<Schemes> ;
  area    : AreaPlugin<Schemes, AreaExtra> | undefined;
  minimap : MinimapPlugin<Schemes>;
  showMap : boolean = true;
  private nodeSource : BehaviorSubject<string> = new BehaviorSubject<string>("");
  selectedSource = this.nodeSource.asObservable();
  selector = AreaExtensions.selector();
  arrange = new AutoArrangePlugin<Schemes>();

  constructor(private injector: Injector) {
    this.editor = new NodeEditor<Schemes>();
    this.minimap = new MinimapPlugin<Schemes>();
  }

  async createEditor(container: HTMLElement, injector: Injector) {
    if (this.area) this.area.destroy();
    this.area = new AreaPlugin<Schemes, AreaExtra>(container);
    
    const connection = new ConnectionPlugin<Schemes, AreaExtra>();
    const angularRender = new AngularPlugin<Schemes, AreaExtra>({ injector });
    const pathPlugin = new ConnectionPathPlugin<Schemes, Area2D<Schemes>>();
    this.arrange = new AutoArrangePlugin<Schemes>();

   this.arrange.addPreset(ArrangePresets.classic.setup());

    angularRender.use(pathPlugin)
    
    this.editor.use(this.area);
    
    this.area.use(this.minimap);
    
    this.area.use(angularRender);
    
    this.area.use(connection);
    
    this.area.use(this.arrange);
    
    AreaExtensions.simpleNodesOrder(this.area);

    AreaExtensions.selectableNodes(this.area, this.selector, { accumulating: accumulateOnCtrl()});
    
    angularRender.addPreset(AngularPresets.classic.setup(
      {
        customize: {
          node() {
            return CustomNodeComponent;
          },
          socket() {
            return CustomSocketComponent;
          },
          connection() {
            return CustomConnectionComponent;
          },
        }
      }
    ));

    connection.addPreset(ConnectionPresets.classic.setup(
    ));

    angularRender.addPreset(AngularPresets.minimap.setup({ size: 200 }));

    const a = new NumberNode(1);
    const b = new NumberNode(1);
    const add = new AddNode();

    await this.editor.addNode(a);
    await this.editor.addNode(b);
    await this.editor.addNode(add);
    
    await this.editor.addConnection(new Connection(a, 'value', add, 'a'));
    await this.editor.addConnection(new Connection(b, 'value', add, 'b'));

    await this.area.nodeViews.get(a.id)?.translate(100, 100);
    await this.area.nodeViews.get(b.id)?.translate(100, 300);
    await this.area.nodeViews.get(add.id)?.translate(400, 150); 
    
    this.area.addPipe(
      context => {
        if (context.type == "nodedragged"){
          console.log(this.editor.getNode(context.data.id))
          this.nodeSource.next(context.data.id);
        }
        return context;
      }
    )

  }

  setEditor(editor: NodeEditor<Schemes>) {
    this.editor = editor;
  }

  async zoomIn() {
    if(!this.editor) return;
    if(!this.area) return;
    // get current zoom
    let zoom: number = this.area.area.transform.k;
    zoom = zoom + .1;
    await this.area.area.zoom(zoom);
  }

  async zoomOut() {
    if(!this.editor) return;
    if(!this.area) return;
    // get current zoom
    let zoom: number = this.area.area.transform.k;
    if (zoom <= 0.2) return;
    zoom = zoom - .1;
    await this.area.area.zoom(zoom);
  }

  async homeZoom() {
    if(!this.area) return;
    AreaExtensions.zoomAt(this.area, this.editor.getNodes());
  }

  async addNode(nodeName: string, nodeId?: string, nodeData?: any){
    if(!this.editor) return;
    if(!this.area) return;

    let node: Node | undefined = undefined;

    if      (nodeName === NumberNode.nodeName)  node = new NumberNode(1);
    else if (nodeName === AddNode.nodeName)     node = new AddNode();
    else if (nodeName === InputNode.nodeName)   node = new InputNode();
    else if (nodeName === OutputNode.nodeName)  node = new OutputNode();
    else if (nodeName === ModuleNode.nodeName)  node = new ModuleNode("Module");
    else if (nodeName === JoinNode.nodeName)    node = new JoinNode();
    else if (nodeName === LoadDatasetNode.nodeName) node = new LoadDatasetNode();
    else if (nodeName === SelectNode.nodeName)  node = new SelectNode();
    else if (nodeName === ReplaceNaNNode.nodeName) node = new ReplaceNaNNode();
    else if (nodeName === SplitTrainTestNode.nodeName) node = new SplitTrainTestNode();
    else if (nodeName === ReplaceNullNode.nodeName) node = new ReplaceNullNode();
    else {
      console.log("Node not found");
      return;
    }

    if (!node) return;

    if (nodeId) {
      node.id = nodeId;
    }

    if (nodeData) {
      node.info = nodeData;
    }

    await this.editor.addNode(node);
    
    let centerOfScreen = this.area.area.pointer;
    await this.area.nodeViews.get(node.id)?.translate(centerOfScreen.x, centerOfScreen.y);
  }

  async getAvailableNodes() : Promise<Map<string, string[]>> {
    return new Map<string, string[]>([
      ['Data adquisition', 
        [ LoadDatasetNode.nodeName, JoinNode.nodeName, SelectNode.nodeName, 
          ReplaceNaNNode.nodeName, ReplaceNullNode.nodeName]
      ],
      ['Misc', 
        [ AddNode.nodeName, NumberNode.nodeName]
      ],
      [
        'Model training',
        [SplitTrainTestNode.nodeName]
      ],
      [ 'Modules',
        [InputNode.nodeName, OutputNode.nodeName, ModuleNode.nodeName]
      ]
    ]);
  }

  getNode(id : string) : Node {
    return this.editor.getNode(id);

  }

  async deleteNode(id: string) {
    const connections = await this.editor.getConnections();
    connections.forEach((element) => {
      if (element.source == id || element.target == id)
        this.editor.removeConnection(element.id);
    })
    await this.editor.removeNode(id);
  }

  unselectNodes() {
    this.selector.unselectAll();
  }
  
  async arrangeNodes() {

    await this.arrange.layout();
  }

  generateJsonOfEditor() {
    console.log("Generating JSON of editor");
    const nodes = [];
    const connections = [];
    for (const node of this.editor.getNodes()){
      nodes.push({
        id: node.id,
        data: node.data(),
        name: node.label,
        className: node.constructor.name,
      });
    }
    for (const c of this.editor.getConnections()) {
      connections.push({
        source: c.source,
        sourceOutput: c.sourceOutput,
        target: c.target,
        targetInput: c.targetInput
      });
    }

    console.log(
      {
        nodes: nodes,
        connections: connections
      }
    );
    var blob = new Blob([JSON.stringify({nodes: nodes, connections : connections}, null, 2)], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "editor.json");
    
  }

  updateNode(node: Node) {
    this.area?.update("node", node.id);
  }
  
}