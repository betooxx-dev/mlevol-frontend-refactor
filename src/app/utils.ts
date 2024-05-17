import { ClassicPreset } from "rete"
import { Node } from "./editor"
import { InputNode } from "./nodes"
import { OutputNode } from "./nodes"
import { JoinNode } from "./nodes"
import { LoadDatasetNode } from "./nodes"
import { SelectNode } from "./nodes"
import { ReplaceNaNNode } from "./nodes"
import { SplitTrainTestNode } from "./nodes"
import { ReplaceNullNode } from "./nodes"
import { MakeCategoricalBinaryNode } from "./nodes"
import { TrainModelNode } from "./nodes"
import { EvaluateModelNode } from "./nodes"
import { LoadModelNode } from "./nodes"
import { ScaleDataNode } from "./nodes"
import { DecomposeNode } from "./nodes"
import { FeatureUnionNode } from "./nodes"
import { ModuleNode } from "./nodes"
import { AnySocket, DataFrameSocket, ModelSocket } from "./sockets"


export function getNewNode(nodeName: string) : Node | undefined {
    let node : Node | undefined = undefined;
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
    else if (nodeName === LoadModelNode.nodeName) node = new LoadModelNode();
    else if (nodeName === ScaleDataNode.nodeName) node = new ScaleDataNode();
    else if (nodeName === DecomposeNode.nodeName) node = new DecomposeNode();
    else if (nodeName === FeatureUnionNode.nodeName) node = new FeatureUnionNode();
    else if (nodeName === ModuleNode.nodeName) node = new ModuleNode("Module");
    return node;
}

export function getAvailableNodes() : Map<string, string[]> {
    return new Map<string, string[]>([
      ['Data preprocessing',
        [ ScaleDataNode.nodeName, MakeCategoricalBinaryNode.nodeName,
          ReplaceNaNNode.nodeName, ReplaceNullNode.nodeName]
      ],
      [
        'Feature engineering',
        [DecomposeNode.nodeName, FeatureUnionNode.nodeName]
      ],
      [ 'Data transformation',
        [JoinNode.nodeName, SelectNode.nodeName, SplitTrainTestNode.nodeName]
      ],
      ['Data adquisition', 
        [ LoadDatasetNode.nodeName]
      ],
      [
        'Model training',
        [TrainModelNode.nodeName, LoadModelNode.nodeName]
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

export function getSocket(sockeName : string) : ClassicPreset.Socket {
    let socket : ClassicPreset.Socket;
    if (sockeName === "DataFrame") {
        socket = new DataFrameSocket();
    } else if (sockeName === "Any") {
        socket = new AnySocket();
    } else if (sockeName === "Model") {
        socket = new ModelSocket();
    }
    else {
        socket = new ClassicPreset.Socket("");
    }
    return socket;
}