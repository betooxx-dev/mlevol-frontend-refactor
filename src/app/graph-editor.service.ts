import { ModuleNode, CustomNode, ParameterNode} from './nodes';
// graph-editor.service.ts
import { Injectable } from '@angular/core';
import { Schemes, Connection, Node, getConnectionSockets} from './editor';

import { NodeEditor } from 'rete';
import { Area2D, AreaExtensions, AreaPlugin } from 'rete-area-plugin';
import { Injector } from '@angular/core'
import {
  AngularPlugin,
  AngularArea2D,
  Presets as AngularPresets,
} from 'rete-angular-plugin/17';

import {
  ClassicFlow,
  ConnectionPlugin,
  getSourceTarget,
} from 'rete-connection-plugin';

import { ConnectionPathPlugin } from "rete-connection-path-plugin";

import { MinimapExtra, MinimapPlugin } from "rete-minimap-plugin";
import { CustomNodeComponent } from './custom-node/custom-node.component';
import { CustomConnectionComponent } from './custom-connection/custom-connection.component';
import { BehaviorSubject } from 'rxjs';
import { AutoArrangePlugin, Presets as ArrangePresets } from "rete-auto-arrange-plugin";
import { saveAs } from 'file-saver';
import { addCustomBackground } from './custom-background/background';
import { CustomSocketComponent} from './custom-socket';
import { ModelNodeComponent } from './custom-node/model-node.component';
import { getBaseURL, getNewNode } from './utils';
import { ConfigurationService } from './configuration.service';
import modules from '../assets/base_editor.json';

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
  private anyChangeSource : BehaviorSubject<string> = new BehaviorSubject<string>("");
  anyChange = this.anyChangeSource.asObservable();
  selectedSource = this.nodeSource.asObservable();
  selectedEditor = this.editorSource.asObservable();
  selector = AreaExtensions.selector();
  arrange = new AutoArrangePlugin<Schemes>();
  modules : any;
  currentModule = 'root';

  constructor(private injector: Injector,
    private configService: ConfigurationService
  ) {
    this.editor = new NodeEditor<Schemes>();
    this.minimap = new MinimapPlugin<Schemes>();
    this.modules = modules;
    this.editorSource.next("General Editor");
  }

  async createEditor(container: HTMLElement, injector: Injector) {
    await this.configService.waitForFetch();
    if (this.area) this.area.destroy();
    this.area = new AreaPlugin<Schemes, AreaExtra>(container);
    
    const connection = new ConnectionPlugin<Schemes, AreaExtra>();
    const angularRender = new AngularPlugin<Schemes, AreaExtra>({ injector });
    const pathPlugin = new ConnectionPathPlugin<Schemes, Area2D<Schemes>>();
    this.arrange = new AutoArrangePlugin<Schemes>();

    this.arrange.addPreset(ArrangePresets.classic.setup());

    angularRender.use(pathPlugin)
    
    this.editor.use(this.area);
    
    this.area.use(angularRender);

    this.area.use(this.minimap);
    
    const editor = this.editor;
    connection.addPreset(
      () =>
        new ClassicFlow({
          canMakeConnection(from, to) {
            // this function checks if the old connection should be removed
            const [source, target] = getSourceTarget(from, to) || [null, null];
  
            if (!source || !target || from === to) return false;
  
            const sockets = getConnectionSockets(
              editor,
              new Connection(
                editor.getNode(source.nodeId),
                source.key as never,
                editor.getNode(target.nodeId),
                target.key as never
              )
            );
  
            if (!sockets.source.isCompatibleWith(sockets.target)) {
              connection.drop();
              return false;
            }
  
            return Boolean(source && target);
          },
          makeConnection(from, to, context) {
            const [source, target] = getSourceTarget(from, to) || [null, null];
            const { editor } = context;

            if (source && target) {
              editor.addConnection(
                new Connection(
                  editor.getNode(source.nodeId),
                  source.key as never,
                  editor.getNode(target.nodeId),
                  target.key as never
                )
              );
              return true;
            }
            return false; // Add this line
          },
        })
    );
    
    this.area.use(connection);
    
    this.area.use(this.arrange);
    
    AreaExtensions.simpleNodesOrder(this.area);

    AreaExtensions.restrictor(this.area, {
      scaling: () => ({ min: 0.3, max: 3 }),
    });

    addCustomBackground(this.area);
    
    angularRender.addPreset(AngularPresets.classic.setup(
      {
        customize: {
          node(data) {
            if (data.payload instanceof ModuleNode) return ModelNodeComponent;
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

    angularRender.addPreset(AngularPresets.minimap.setup({ size: 200 }));
    
    this.area.addPipe(
      context => {
        if (context.type == "nodedragged"){
          this.selectNode(context.data.id);
        }
        return context;
      }
    )

    this.loadEditor(
      JSON.stringify(
        this.modules
      )
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
    this.anyChangeSource.next("Node added");
    if(!this.editor) return;
    if(!this.area) return;

    let node = getNewNode(nodeName, this.configService.getNode(nodeName));
    if (!node) {
      console.log("Node not found");
      return;
    }
    if (nodeName === "Step") {
      this.modules[node.id] = {
          'nodes' : [],
          'connections' : [],
          'inputs' : [],
          'outputs' : [],
      };
    }

    if (nodeId) {
      node.id = nodeId;
    }
    
    if (nodeData) {
      node.setData(nodeData);
    }


    node.update();

    await this.editor.addNode(node);
    let centerOfScreen = this.area.area.pointer;
    await this.area.nodeViews.get(node.id)?.translate(centerOfScreen.x, centerOfScreen.y);
    await this.area.nodeViews.get(node.id)?.resize(node.width, node.height);

  }

  getAvailableNodes() {
    return this.configService.getAvailableNodes();
  }

  selectNode(nodeId : string) {
    this.nodeSource.next(nodeId);
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
    this.anyChangeSource.next("Node deleted");
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

    for (let module in this.modules) {
      if (!(allNodesIds.includes(module)) && !(module === 'root')) {
        delete this.modules[module];
      }
    }
    this.anyChangeSource.next("Modules cleaned");
  }

  async updateNode(node: Node) {
    if (node.nodeName === "Input" || "Output") {
      // TODO USING INHERITANCE
    }
    await this.area?.update("node", node.id);
    await this.area?.nodeViews.get(node.id)?.resize(node.width, node.height);
    this.anyChangeSource.next("Node updated");
  }

  async getNodeModule(nodeId : string) {
    for (const module of Object.keys(this.modules)){
      if (module == "root") continue;
      const nodes_of_module = this.modules[module].nodes;
      for (const node of nodes_of_module){
        if (node.id == nodeId){
          return module;
        }
      }
    }
    return ""
  }

  findInputs() {
    let nodes = this.editor.getNodes();
    let inputNodes = [];
    for (let node of nodes) {
      if (node.getNodeName() === "Input") {
        inputNodes.push(node);
      }
    }
    return inputNodes;
  }

  findOutputs(){
    let nodes = this.editor.getNodes();
    let outputNodes = [];
    for (let node of nodes) {
      if (node.getNodeName() === "Output") {
        outputNodes.push(node);
      }
    }
    return outputNodes;
  }

  async loadEditor(json: string) {
    await this.editor.clear(); 
    const data = await JSON.parse(json);
    this.modules = data.modules;
    console.log(data);
    await this.changeEditor("root", false);

  }

  async cleanEditor() {
    await this.editor.clear();
    let node = new ModuleNode();
    node.id = "root";
    await this.changeEditor(node.id, false);
  }

  getModuleTag(moduleId: string) : string {
    const real_node = this.getNode(moduleId) as ModuleNode;
    if (real_node) {
        return real_node.getName();
    }
    return "General Editor"
  }

  private async clearEditor(){
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
  
      await this.editor.clear();
  }

  async changeEditor(targetModuleId: string, clear?: boolean) {
    if ((targetModuleId != 'root') && this.currentModule == targetModuleId) return;
    
    this.editorSource.next(this.getModuleTag(targetModuleId))

    if (clear) await this.clearEditor();

    this.currentModule = targetModuleId;

    console.log(this.modules[this.currentModule]);

    for (let node of this.modules[this.currentModule].nodes) {
      await this.addNode(node.nodeName, node.id, node.data);
      if (node.nodeName === "Step") {
        let inputs = this.modules[node.id].inputs;
        let outputs = this.modules[node.id].outputs;
        let inputStrings: [string, string][] = [];
        let outputStrings: [string, string][] = [];
        for (let input of inputs) {
          inputStrings.push([input.data.params.key.value, input.data.params.type.value]);
        }
        for (let output of outputs) {
          outputStrings.push([output.data.params.key.value, output.data.params.type.value]);
        }
        
        let nodeModule = await this.editor.getNode(node.id) as ModuleNode;
        nodeModule.syncPorts(inputStrings, outputStrings);
        await this.updateNode(nodeModule);
      }
    }

    for (let connection of this.modules[this.currentModule].connections) {
        try{
        let sourceNode = await this.editor.getNode(connection.source);
        let targetNode = await this.editor.getNode(connection.target);
        await this.editor.addConnection(new Connection(sourceNode, connection.sourceOutput as never, targetNode, connection.targetInput as never));
      }
      catch (e) {
        console.log("Error", e);
      }
    }

    await this.arrangeNodes();
    await this.homeZoom();

    this.cleanModules();
    this.anyChangeSource.next("Editor changed");
  }

  async getParameterNodes() {
    let nodes = this.editor.getNodes();
    let parameterNodes = [];
    for (let node of nodes) {
      if (node instanceof ParameterNode) {
        parameterNodes.push(node);
      }
    }
    return parameterNodes;
  }

  async generateAndDownloadCode() {

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
    const body: string = JSON.stringify(
      {
        code : {modules: this.modules},
        nodes : this.configService.getNodes()
      }
    );
    
    const response = await fetch(getBaseURL('/api/create_app'), { // FIXME: Hardcoded URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // CORS disable
          'Access-Control-Allow-Origin': '*',
        },
        body: body,
    });

    console.log("Response", response);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const blob = await response.blob();
    saveAs(blob, "app.zip");
  }
  
}