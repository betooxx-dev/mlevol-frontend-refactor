import { Node } from "./editor"
import { ModuleNode, CustomNode,
  ParameterNode,
  InputNode,
  OutputNode} from "./nodes"

import { CustomSocket } from "./sockets"

export function getNewNode(nodeName: string) : Node {
    let node : Node;
    if (nodeName === "Step") node = new ModuleNode();
    else if (nodeName === "Input") node = new InputNode();
    else if (nodeName === "Output") node = new OutputNode();
    else if (nodeName === "Parameter") node = new ParameterNode();
    else node = new CustomNode(nodeName);
    return node;
}

export function getSocket(socketName : string) : CustomSocket {
    return new CustomSocket(socketName);
}