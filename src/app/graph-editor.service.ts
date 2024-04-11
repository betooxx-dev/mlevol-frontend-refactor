import { ViewChild } from '@angular/core';
// graph-editor.service.ts
import { Injectable } from '@angular/core';

import { ClassicPreset as Classic, ClassicPreset, GetSchemes, NodeEditor } from 'rete';
import { Area2D, AreaExtensions, AreaPlugin } from 'rete-area-plugin';
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

import { MinimapExtra, MinimapPlugin } from "rete-minimap-plugin";
import { CustomNodeComponent } from './custom-node/custom-node.component';
import { CustomSocketComponent } from './custom-socket/custom-socket.component';
import { CustomConnectionComponent } from './custom-connection/custom-connection.component';

type Node = NumberNode | AddNode;

//type Node =  | ;
type Conn =
  | Connection<NumberNode, AddNode>
  | Connection<AddNode, AddNode>
  | Connection<AddNode, NumberNode>;
type Schemes = GetSchemes<Node, Conn>;

class Connection<A extends Node, B extends Node> extends Classic.Connection<
  A,
  B
> {}

class NumberNode extends Classic.Node {
  width = 190;
  height = 120;
  color = "rgba(255, 0, 0, 0.5)";
  constructor(initial: number, change?: (value: number) => void) {
    super('Number');
    this.addOutput('value', new Classic.Output(socket, 'Number'));
    this.addControl(
      'value',
      new Classic.InputControl('number', { initial, change })
    );
  }
}

class AddNode extends Classic.Node {
  width = 190;
  height = 120;
  color = "";
  constructor() {
    super('Add');

    this.addInput('a', new Classic.Input(socket, 'A'));
    this.addInput('b', new Classic.Input(socket, 'B'));
    this.addOutput('value', new Classic.Output(socket, 'Number'));
    this.addControl(
      'result',
      new Classic.InputControl('number', { initial: 0, readonly: true })
    );
  }
}

type AreaExtra = Area2D<Schemes> | AngularArea2D<Schemes>  | MinimapExtra;
const socket = new Classic.Socket('socket');


@Injectable({
  providedIn: 'root'
})
export class GraphEditorService {
  editor  : NodeEditor<Schemes> ;
  area    : AreaPlugin<Schemes, AreaExtra> | undefined;
  minimap : MinimapPlugin<Schemes>;
  showMap : boolean = true;

  constructor(private injector: Injector) {
    this.editor = new NodeEditor<Schemes>();
    this.minimap = new MinimapPlugin<Schemes>();
    
  }

  async createEditor(container: HTMLElement, injector: Injector) {
    if (this.area) this.area.destroy();
    this.area = new AreaPlugin<Schemes, AreaExtra>(container);
    
    const connection = new ConnectionPlugin<Schemes, AreaExtra>();

    const angularRender = new AngularPlugin<Schemes, AreaExtra>({ injector });
    this.editor.use(this.area);

    this.area.use(this.minimap);
    
    this.area.use(angularRender);

    this.area.use(connection);

    AreaExtensions.simpleNodesOrder(this.area);

    

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

  async addNode(nodeName: string){
    if(!this.editor) return;
    if(!this.area) return;

    let node: Node | undefined = undefined;
    if (nodeName === 'Number') {
      node = new NumberNode(1);
    }

    else if (nodeName === 'Add') {
      node = new AddNode();
    }

    if (!node) return;

    await this.editor.addNode(node);
    
    let centerOfScreen = this.area.area.transform;
    await this.area.nodeViews.get(node.id)?.translate(centerOfScreen.x, centerOfScreen.y);
  }

  async getAvailableNodes() : Promise<string[]> {
    return ['Number', 'Add'];
  }
}