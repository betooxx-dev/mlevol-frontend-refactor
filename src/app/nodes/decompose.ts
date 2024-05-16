import { ClassicPreset as Classic } from "rete";
import { DataFrameSocket } from "../sockets";
import { InputOptions } from "../dropbox.options";

export class DecomposeNode extends Classic.Node<
  { input_dataset:  DataFrameSocket},
  { output_dataset: DataFrameSocket},
  {}
  >
  {
    width = 190;
    height = 150;
    color = "rgba(132, 132, 0, 0.5)";
    public static nodeName: string = "Decompose";
    info: any = {
      info : {
          title: 'Extracts improtant features',
      },
      inputs : {
        description: {
          type: "string",
          value: "select nothing"
        },
        number_features: {
          type: "number",
          value: 2,
        },
        type: {
          type: "option",
          optionId: "decompose_type",
          value: InputOptions['decompose_type'][0],
          show: true,
        },
      },
    };

    constructor() {
      super('Decompose');
  
      this.addInput('input_dataset', new Classic.Input(new DataFrameSocket(), ''));
      this.addOutput('output_dataset', new Classic.Output(new DataFrameSocket(), ''));
    }

    data() {
      return this.info;
    }

    getNodeName() {
      return DecomposeNode.nodeName;
    }

    update() {
    }
  }