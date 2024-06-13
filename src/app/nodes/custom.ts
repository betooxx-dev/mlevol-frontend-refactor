import { ClassicPreset as Classic, NodeEditor } from "rete";
import { CustomSocket } from "../sockets";

export class CustomNode
    extends Classic.Node<
    Record<string, CustomSocket>,
    Record<string, CustomSocket>
  > implements Classic.Node{
    width = 180;
    height = 140;
    color : string = "rgba(255, 99, 132, 0.75)";
    nodeName: string;
    info : any = {};
    params : any = {};
    constructor(config: any) {
        super(config["nodeName"]);
        this.nodeName = config["nodeName"];
    }
    update() {
        this.color = this.params["color"]["value"];
    }

    data() {
        return {
            info: this.info,
            params: this.params
        };
    }

    getNodeName() {
        return this.nodeName;
    }
    }
