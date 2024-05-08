import { ClassicPreset as Classic, GetSchemes } from "rete";
import { EvaluateModelNode, InputNode, JoinNode, MakeCategoricalBinaryNode, ModuleNode, OutputNode, ReplaceNaNNode, ReplaceNullNode, SelectNode, SplitTrainTestNode, TrainModelNode } from "./nodes";
import { CurveFactory } from "d3-shape";

export type Node = InputNode | OutputNode | ModuleNode
                 | SplitTrainTestNode | ReplaceNaNNode | ReplaceNullNode | SelectNode
                 | JoinNode | EvaluateModelNode | MakeCategoricalBinaryNode | TrainModelNode;

//type Node =  | ;
type Conn = Connection<Node, Node>;
  
export type Schemes = GetSchemes<Node, Conn>;

export class Connection<A extends Node, B extends Node> extends Classic.Connection<
  A,
  B
> {
  curve?: CurveFactory;
}