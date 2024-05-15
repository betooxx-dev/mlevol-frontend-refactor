import { ClassicPreset as Classic } from "rete";
import { DataFrameSocket, socket } from "../sockets/sockets";

export class MakeCategoricalBinaryNode extends Classic.Node {
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
          value: "select nothing"
        },
        columns: {
            type: "string",
            value: "",
        },
      },
    };

    constructor() {
      super('Make Categorical Binary');
  
      this.addInput('input_dataset', new Classic.Input(new DataFrameSocket(), 'dataset'));
      this.addOutput('output_dataset', new Classic.Output(new DataFrameSocket(), 'binarized'));
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