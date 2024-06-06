import { ClassicPreset as Classic, ClassicPreset, GetSchemes, NodeEditor } from "rete";
import { DecomposeNode, DropColumnsNode, EncoderNode, EvaluateModelNode, FeatureUnionNode, InputNode, JoinNode, LoadDatasetNode, LoadModelNode, MakeCategoricalBinaryNode, ModuleNode, OutputNode, ReplaceNaNNode, ReplaceNullNode, ReuseEncoderNode, ScaleDataNode, SelectNode, SplitTrainTestNode, TrainModelNode, PredictNode, ReuseScaleDataNode, ParameterNode } from "./nodes";
import { DataFrameSocket, ModelSocket } from "./sockets/sockets";

export type Node = InputNode | OutputNode | ModuleNode
                 | SplitTrainTestNode | ReplaceNaNNode | ReplaceNullNode | SelectNode
                 | JoinNode | EvaluateModelNode | MakeCategoricalBinaryNode | TrainModelNode
                 | LoadModelNode | LoadDatasetNode | ScaleDataNode | DecomposeNode
                 | FeatureUnionNode | EncoderNode | ReuseEncoderNode | DropColumnsNode
                 | PredictNode | ReuseScaleDataNode | ParameterNode;


type Sockets = DataFrameSocket | ModelSocket;

//type Node =  | ;
type Conn = Connection<Node, Node>;
  
export type Schemes = GetSchemes<Node, Conn>;

export class Connection<A extends Node, B extends Node> extends Classic.Connection< A, B > {}

type Input = ClassicPreset.Input<Sockets>;
type Output = ClassicPreset.Output<Sockets>;

export function getConnectionSockets(
  editor: NodeEditor<Schemes>,
  connection: Schemes["Connection"]
) {
  const source = editor.getNode(connection.source);
  const target = editor.getNode(connection.target);

  const output =
    source &&
    (source.outputs as Record<string, Input>)[connection.sourceOutput];
  const input =
    target && (target.inputs as Record<string, Output>)[connection.targetInput];

  return {
    source: output?.socket,
    target: input?.socket
  };
}
