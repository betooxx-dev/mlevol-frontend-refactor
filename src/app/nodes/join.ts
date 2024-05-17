import { ClassicPreset as Classic } from "rete";
import { DataFrameSocket } from "../sockets";

export class JoinNode extends Classic.Node<
{ left_table: DataFrameSocket,
    right_table: DataFrameSocket },
{ resulting_table: DataFrameSocket},
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
          type: "option",
          optionId: "join_type",
          value: "inner",
          show: true,
        },
        index :  {
          type: "string",
          value: "",
        },
      },
    };
  
    constructor() {
      super('Join');
  
      this.addInput('left_table', new Classic.Input(new DataFrameSocket(), 'left'));
      this.addInput('right_table', new Classic.Input(new DataFrameSocket(), 'right'));
      this.addOutput('resulting_table', new Classic.Output(new DataFrameSocket(), 'resulting'));
    }

    data() {
      return this.info;
    }
    getNodeName() {
      return JoinNode.nodeName;
    }
    update() {
    }
  }