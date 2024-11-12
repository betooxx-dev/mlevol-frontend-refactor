import { ClassicPreset as Classic, ClassicPreset, GetSchemes, NodeEditor } from "rete";
import { CustomSocket } from "./sockets/sockets";
import { CustomNode, InputNode, ModuleNode, OutputNode } from "./nodes";

export type Node = ModuleNode | CustomNode | InputNode | OutputNode; 


type Sockets = CustomSocket;

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
