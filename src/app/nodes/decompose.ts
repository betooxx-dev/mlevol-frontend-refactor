import { ClassicPreset as Classic } from "rete";
import { DataFrameSocket, ObjectSocket } from "../sockets";
import { InputOptions } from "../dropbox.options";

export class DecomposeNode extends Classic.Node<
  { input_dataset:  DataFrameSocket},
  { output_dataset: DataFrameSocket,
    decomposer: ObjectSocket,
  },
  
  {}
  >
  {
    width = 190;
    height = 190;
    color = "rgba(132, 132, 0, 0.5)";
    public static nodeName: string = "Decompose";
    info: any = {
      info : {
          title: 'Extracts important features',
      },
      inputs : {
        description: {
          type: "string",
          value: "select nothing",
          show: true,
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
        dataset_tag: {
          type: "string",
          value: "variable_name",
        }
      },
    };

    constructor() {
      super(DecomposeNode.nodeName);
  
      this.addInput('input_dataset', new Classic.Input(new DataFrameSocket(), 'data'));
      this.addOutput('output_dataset', new Classic.Output(new DataFrameSocket(), ''));
      this.addOutput('decomposer', new Classic.Output(new ObjectSocket(), 'decomposer'));
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