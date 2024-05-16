import { ClassicPreset as Classic } from "rete";
import { DataFrameSocket } from "../sockets";

export class FeatureUnionNode extends Classic.Node<
{ left_table: DataFrameSocket,
    right_table: DataFrameSocket },
{ resulting_table: DataFrameSocket},
{}
> implements Classic.Node{
    width = 190;
    height = 140;
    color = "rgba(132, 132, 0, 0.5)";
    public static nodeName: string = "Feature Union";
    info = {
      info: {
          title: 'Joins two features',
      },
      inputs: {
        description :{
          type: "string",
          value: "Feature Union description",
        },
        type :{
          type: "option",
          optionId: "join_type",
          value: "inner",
          show: true,
        },
      },
    };
  
    constructor() {
      super(FeatureUnionNode.nodeName);
  
      this.addInput('left_table', new Classic.Input(new DataFrameSocket(), ''));
      this.addInput('right_table', new Classic.Input(new DataFrameSocket(), ''));
      this.addOutput('resulting_table', new Classic.Output(new DataFrameSocket(), ''));
    }

    data() {
      return this.info;
    }
    getNodeName() {
      return FeatureUnionNode.nodeName;
    }
    update() {
    }
  }