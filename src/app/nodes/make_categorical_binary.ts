import { ClassicPreset as Classic } from "rete";
import { DataFrameSocket } from "../sockets";

export class MakeCategoricalBinaryNode extends Classic.Node<
  { input_dataset:  DataFrameSocket},
  { output_dataset: DataFrameSocket},
  {}
  >
  {
    width = 190;
    height = 150;
    color = "rgba(132, 132, 0, 0.5)";
    public static nodeName: string = "Make Categorical Binary";
    info: any = {
      info : {
          title: 'Makes binary some columns',
      },
      inputs : {
        description: {
          type: "string",
          value: "change nothing"
        },
        columns: {
            type: "string",
            value: "",
        },
        dataset_tag: {
          type: "string",
          value: "variable_name",
        }
      },
    };

    constructor() {
      super('Make Categorical Binary');
  
      this.addInput('input_dataset', new Classic.Input(new DataFrameSocket(), ''));
      this.addOutput('output_dataset', new Classic.Output(new DataFrameSocket(), ''));
    }

    data() {
      return this.info;
    }

    getNodeName() {
      return MakeCategoricalBinaryNode.nodeName;
    }

    update() {
    }
  }