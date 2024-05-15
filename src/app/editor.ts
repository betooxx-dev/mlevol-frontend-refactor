import { ClassicPreset as Classic, ClassicPreset, GetSchemes, NodeEditor } from "rete";
import { EvaluateModelNode, InputNode, JoinNode, MakeCategoricalBinaryNode, ModuleNode, OutputNode, ReplaceNaNNode, ReplaceNullNode, SelectNode, SplitTrainTestNode, TrainModelNode } from "./nodes";
import { CurveFactory } from "d3-shape";
import { DataFrameSocket, ModelSocket } from "./sockets/sockets";


export type Node = InputNode | OutputNode | ModuleNode
                 | SplitTrainTestNode | ReplaceNaNNode | ReplaceNullNode | SelectNode
                 | JoinNode | EvaluateModelNode | MakeCategoricalBinaryNode | TrainModelNode;


type Sockets = DataFrameSocket | ModelSocket;

//type Node =  | ;
type Conn = Connection<Node, Node>;
  
export type Schemes = GetSchemes<Node, Conn>;

export class Connection<A extends Node, B extends Node> extends Classic.Connection<
  A,
  B
> {
  curve?: CurveFactory;
}

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
