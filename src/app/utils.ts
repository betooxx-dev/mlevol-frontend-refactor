import { Node } from "./editor"
import { ModuleNode, CustomNode,
  ParameterNode} from "./nodes"

import { CustomSocket } from "./sockets"

export function getNewNode(nodeName: string) : Node {
    let node : Node;
    if (nodeName === "Step") node = new ModuleNode();
    else if (nodeName === "Parameter") node = new ParameterNode();
    else node = new CustomNode("");
    return node;
}

export function getAvailableNodes() : Map<string, string[]> {
    return new Map<string, string[]>([]);
}

export function getSocket(socketName : string) : CustomSocket {
    return new CustomSocket(socketName);
}