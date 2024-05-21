import { ClassicPreset } from "rete"
import { Node } from "./editor"
import { InputNode, ReuseScaleDataNode, OutputNode, JoinNode, 
  LoadDatasetNode, SelectNode, ReplaceNaNNode, SplitTrainTestNode, 
  ReplaceNullNode, MakeCategoricalBinaryNode, TrainModelNode, 
  EvaluateModelNode, LoadModelNode, ScaleDataNode, DecomposeNode, 
  FeatureUnionNode, ModuleNode, EncoderNode, ReuseEncoderNode,
  ReuseDecomposeNode, DropColumnsNode} from "./nodes"

import { AnySocket, DataFrameSocket, ModelSocket, ResultSocket } from "./sockets"
import { ObjectSocket } from "./sockets/sockets"
import { PredictNode } from "./nodes/predict"


export function getNewNode(nodeName: string) : Node | undefined {
    let node : Node | undefined = undefined;
    if (nodeName === InputNode.nodeName)   node = new InputNode();
    else if (nodeName === OutputNode.nodeName)  node = new OutputNode();
    else if (nodeName === JoinNode.nodeName)    node = new JoinNode();
    else if (nodeName === LoadDatasetNode.nodeName) node = new LoadDatasetNode();
    else if (nodeName === SelectNode.nodeName)  node = new SelectNode();
    else if (nodeName === DropColumnsNode.nodeName) node = new DropColumnsNode();
    else if (nodeName === ReplaceNaNNode.nodeName) node = new ReplaceNaNNode();
    else if (nodeName === SplitTrainTestNode.nodeName) node = new SplitTrainTestNode();
    else if (nodeName === ReplaceNullNode.nodeName) node = new ReplaceNullNode();
    else if (nodeName === MakeCategoricalBinaryNode.nodeName) node = new MakeCategoricalBinaryNode();
    else if (nodeName === TrainModelNode.nodeName) node = new TrainModelNode();
    else if (nodeName === EvaluateModelNode.nodeName) node = new EvaluateModelNode();
    else if (nodeName === LoadModelNode.nodeName) node = new LoadModelNode();
    else if (nodeName === ScaleDataNode.nodeName) node = new ScaleDataNode();
    else if (nodeName === DecomposeNode.nodeName) node = new DecomposeNode();
    else if (nodeName === ReuseDecomposeNode.nodeName) node = new ReuseDecomposeNode();
    else if (nodeName === FeatureUnionNode.nodeName) node = new FeatureUnionNode();
    else if (nodeName === ReuseScaleDataNode.nodeName) node = new ReuseScaleDataNode();
    else if (nodeName === EncoderNode.nodeName) node = new EncoderNode();
    else if (nodeName === ReuseEncoderNode.nodeName) node = new ReuseEncoderNode();
    else if (nodeName === ModuleNode.nodeName) node = new ModuleNode("Module");
    return node;
}

export function getAvailableNodes() : Map<string, string[]> {
    return new Map<string, string[]>([
      ['Data acquisition', 
        [ LoadDatasetNode.nodeName]
      ],
      ['Data preprocessing',
        [ ScaleDataNode.nodeName, ReuseScaleDataNode.nodeName, MakeCategoricalBinaryNode.nodeName,
          ReplaceNaNNode.nodeName, ReplaceNullNode.nodeName, EncoderNode.nodeName, ReuseEncoderNode.nodeName]
      ],
      [
        'Feature engineering',
        [DecomposeNode.nodeName, ReuseDecomposeNode.nodeName, FeatureUnionNode.nodeName]
      ],
      [ 'Data transformation',
        [JoinNode.nodeName, SelectNode.nodeName, SplitTrainTestNode.nodeName, DropColumnsNode.nodeName]
      ],
      [
        'Model training',
        [TrainModelNode.nodeName, LoadModelNode.nodeName]
      ],
      [
        'Evaluation',
        [EvaluateModelNode.nodeName , PredictNode.nodeName]
      ],
      [ 'Modules',
        [InputNode.nodeName, OutputNode.nodeName, ModuleNode.nodeName]
      ]
    ]);
}

export function getSocket(socketName : string) : ClassicPreset.Socket {
    let socket : ClassicPreset.Socket;
    if (socketName === "DataFrame") {
        socket = new DataFrameSocket();
    } else if (socketName === "Any") {
        socket = new AnySocket();
    } else if (socketName === "Model") {
        socket = new ModelSocket();
    } else if (socketName === "Result") {
        socket = new ResultSocket();
    } else if (socketName === "Object") {
        socket = new ObjectSocket();
    }
    else {
        socket = new ClassicPreset.Socket("");
    }
    return socket;
}