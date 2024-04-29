import { ClassicPreset as Classic } from "rete";
import { socket } from "../sockets/sockets";

export class JoinNode extends Classic.Node<
{ left_table: Classic.Socket,
    right_table: Classic.Socket },
{ resulting_table: Classic.Socket},
{}
> implements Classic.Node{
    width = 190;
    height = 140;
    color = "rgba(132, 132, 0, 0.5)";
    public static nodeName: string = "Join";
    info = {
      info: {
          title: 'Joins two tables',
      },
      inputs: {
        description :{
          type: "string",
          value: "Join description",
        },
        type :{
          type: "string",
          value: "inner",
        },
      },
    };
  
    constructor() {
      super('Join');
  
      this.addInput('left_table', new Classic.Input(socket, 'left'));
      this.addInput('right_table', new Classic.Input(socket, 'right'));
      this.addOutput('resulting_table', new Classic.Output(socket, ''));
    }

    data() {
      return this.info;
    }

    getNodeName() {
      return JoinNode.nodeName;
    }
  }