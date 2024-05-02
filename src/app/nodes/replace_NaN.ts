import { ClassicPreset as Classic } from "rete";
import { socket } from "../sockets/sockets";

export class ReplaceNaNNode extends Classic.Node<
{ origin_table: Classic.Socket },
{ resulting_table: Classic.Socket},
{}
> implements Classic.Node{
    width = 190;
    height = 90;
    color = "rgba(132, 132, 0, 0.5)";
    public static nodeName: string = "Replace Nan";
    info = {
      info: {
          title: 'Replace NaN values',
      },
      inputs: {
          value: {
              type: "string",
              value: "0",
          },
      },
    };
    constructor() {
      super('Replace NaN');
  
      this.addInput('origin_table', new Classic.Input(socket, ''));
      this.addOutput('resulting_table', new Classic.Output(socket, ''));
    }

    data() {
      return this.info;
    }

    getNodeName() {
      return ReplaceNaNNode.nodeName;
    }
    update() {
    }
  }