import { EvaluateModelNode, InputNode, MakeCategoricalBinaryNode, ModuleNode, OutputNode, TrainModelNode} from './nodes';
// graph-editor.service.ts
import { Injectable, OnChanges, input } from '@angular/core';
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
import { addCustomBackground } from './custom-background/background';


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
  private editorSource : BehaviorSubject<string> = new BehaviorSubject<string>("General Editor");
  selectedSource = this.nodeSource.asObservable();
  selectedEditor = this.editorSource.asObservable();
  selector = AreaExtensions.selector();
  arrange = new AutoArrangePlugin<Schemes>();
  modules : any;
  currentModule = 'root';

  constructor(private injector: Injector) {
    this.editor = new NodeEditor<Schemes>();
    this.minimap = new MinimapPlugin<Schemes>();
    this.modules = {
      'root': {
        'nodes' : [],
        'connections' : [],
        'inputs' : [],
        'outputs' : [],
      }
    };
    this.editorSource.next("General Editor");
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

    addCustomBackground(this.area);
    
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

    if (nodeName === InputNode.nodeName)   node = new InputNode();
    else if (nodeName === OutputNode.nodeName)  node = new OutputNode();
    else if (nodeName === JoinNode.nodeName)    node = new JoinNode();
    else if (nodeName === LoadDatasetNode.nodeName) node = new LoadDatasetNode();
    else if (nodeName === SelectNode.nodeName)  node = new SelectNode();
    else if (nodeName === ReplaceNaNNode.nodeName) node = new ReplaceNaNNode();
    else if (nodeName === SplitTrainTestNode.nodeName) node = new SplitTrainTestNode();
    else if (nodeName === ReplaceNullNode.nodeName) node = new ReplaceNullNode();
    else if (nodeName === MakeCategoricalBinaryNode.nodeName) node = new MakeCategoricalBinaryNode();
    else if (nodeName === TrainModelNode.nodeName) node = new TrainModelNode();
    else if (nodeName === EvaluateModelNode.nodeName) node = new EvaluateModelNode();
    else if (nodeName === ModuleNode.nodeName) {
      node = new ModuleNode("Module");
      this.modules[node.id] = {
          'nodes' : [],
          'connections' : [],
          'inputs' : [],
          'outputs' : [],
      };
    }
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
    
    node.update();

    await this.editor.addNode(node);
    
    let centerOfScreen = this.area.area.pointer;
    await this.area.nodeViews.get(node.id)?.translate(centerOfScreen.x, centerOfScreen.y);
  }

  async getAvailableNodes() : Promise<Map<string, string[]>> {
    return new Map<string, string[]>([
      ['Data adquisition', 
        [ LoadDatasetNode.nodeName, JoinNode.nodeName, SelectNode.nodeName, 
          ReplaceNaNNode.nodeName, ReplaceNullNode.nodeName, MakeCategoricalBinaryNode.nodeName]
      ],
      [
        'Model training',
        [SplitTrainTestNode.nodeName, TrainModelNode.nodeName]
      ],
      [
        'Evaluation',
        [EvaluateModelNode.nodeName]
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
    let nodes = [];
    let connections = [];
    let inputs = [];
    let outputs = [];

    for (let node of this.editor.getNodes()) {
      nodes.push({
        id: node.id,
        data: node.data(),
        name: node.label,
        nodeName: node.getNodeName(),
      });
    }
    for (let c of this.editor.getConnections()) {
      connections.push({
        source: c.source,
        sourceOutput: c.sourceOutput,
        target: c.target,
        targetInput: c.targetInput
      });
    }
    for (let input of this.findInputs()) {
      inputs.push({
        id: input.id,
        data: input.data(),
      });
    }
    for (let output of this.findOutputs()) {
      outputs.push({
        id: output.id,
        data: output.data(),
      });
    }
    
    this.modules[this.currentModule] = {
      nodes: nodes,
      connections: connections,
      inputs: inputs,
      outputs: outputs,
    };

    this.cleanModules();

    var blob = new Blob([JSON.stringify({modules: this.modules}, null, 2)], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "editor.json");
    
  }

  cleanModules() {
    let allNodesIds = [];
    for (let module in this.modules) {
      let nodes = this.modules[module].nodes;
      for (let node of nodes) {
        allNodesIds.push(node.id);
      }
    }
    console.log("All nodes", allNodesIds);
    for (let module in this.modules) {
      if (!(allNodesIds.includes(module)) && !(module === 'root')) {
        delete this.modules[module];
      }
    }
  }

  async updateNode(node: Node) {
    await this.area?.update("node", node.id);
  }

  findInputs() {
    let nodes = this.editor.getNodes();
    let inputNodes = [];
    for (let node of nodes) {
      if (node instanceof InputNode) {
        inputNodes.push(node);
      }
    }
    return inputNodes;
  }

  findOutputs(){
    let nodes = this.editor.getNodes();
    let outputNodes = [];
    for (let node of nodes) {
      if (node instanceof OutputNode) {
        outputNodes.push(node);
      }
    }
    return outputNodes;
  }

  async loadEditor(json: string) {
    console.log("json", json);
    await this.editor.clear();
    const data = await JSON.parse(json);
    console.log("Loaded data", data);
    this.modules = data.modules;
    console.log("Loaded modules", this.modules);
    let node = new ModuleNode("root");
    node.id = "root";
    await this.changeEditor(node, false);
  }

  async changeEditor(targetModule: Node, clear?: boolean) {
    this.editorSource.next(targetModule.info.inputs.description.value);
    if (clear){
      let nodes = [];
      let connections = [];
      let inputs = [];
      let outputs = [];
  
      for (let node of this.editor.getNodes()) {
        nodes.push({
          id: node.id,
          data: node.data(),
          name: node.label,
          nodeName: node.getNodeName(),
        });
      }
      for (let c of this.editor.getConnections()) {
        connections.push({
          source: c.source,
          sourceOutput: c.sourceOutput,
          target: c.target,
          targetInput: c.targetInput
        });
      }
      for (let input of this.findInputs()) {
        inputs.push({
          id: input.id,
          data: input.data(),
        });
      }
      for (let output of this.findOutputs()) {
        outputs.push({
          id: output.id,
          data: output.data(),
        });
      }
  
      this.modules[this.currentModule] = {
        nodes: nodes,
        connections: connections,
        inputs: inputs,
        outputs: outputs,
      };
  
      console.log("Stored module: ", this.modules[this.currentModule]);
      
      for (let node of this.editor.getNodes()) {
        await this.editor.removeNode(node.id);
      }
  
      for (let connection of this.editor.getConnections()) {
        await  this.editor.removeConnection(connection.id);
      }
  
      await this.editor.clear();
    }

    this.currentModule = targetModule.id;

    console.log("Module to load", this.modules[this.currentModule]);


    for (let node of this.modules[this.currentModule].nodes) {
      await this.addNode(node.nodeName, node.id, node.data);
      if (node.nodeName === ModuleNode.nodeName) {
        let inputs = this.modules[node.id].inputs;
        let outputs = this.modules[node.id].outputs;
        let inputStrings = [];
        let outputStrings = [];
        console.log("Inputs", inputs);
        console.log("Outputs", outputs);
        for (let input of inputs) {
          inputStrings.push(input.data.inputs.key.value);
        }
        for (let output of outputs) {
          outputStrings.push(output.data.inputs.key.value);
        }
        
        let nodeModule = await this.editor.getNode(node.id) as ModuleNode;
        nodeModule.syncPorts(inputStrings, outputStrings);
        await this.updateNode(nodeModule);
      }
    }

    try{
      for (let connection of this.modules[this.currentModule].connections) {
        let sourceNode = await this.editor.getNode(connection.source);
        let targetNode = await this.editor.getNode(connection.target);
        await this.editor.addConnection(new Connection(sourceNode, connection.sourceOutput as never, targetNode, connection.targetInput as never));
      }
    }
    catch (e) {
      console.log("Error", e);
    }

    console.log("Current editor", this.editor);

    await this.arrangeNodes();
  }
  
}