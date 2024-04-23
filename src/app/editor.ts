import { ClassicPreset as Classic, GetSchemes } from "rete";
import { AddNode, InputNode, JoinNode, ModuleNode, NumberNode, OutputNode, ReplaceNaNNode, ReplaceNullNode, SelectNode, SplitTrainTestNode } from "./nodes";
import { CurveFactory } from "d3-shape";

export type Node = NumberNode | AddNode | InputNode | OutputNode | ModuleNode
                 | SplitTrainTestNode | ReplaceNaNNode | ReplaceNullNode | SelectNode
                 | JoinNode;

//type Node =  | ;
type Conn =
  | Connection<NumberNode, AddNode>
  | Connection<AddNode, AddNode>
  | Connection<AddNode, NumberNode>;
  
export type Schemes = GetSchemes<Node, Conn>;

export class Connection<A extends Node, B extends Node> extends Classic.Connection<
  A,
  B
> {
  curve?: CurveFactory;
}