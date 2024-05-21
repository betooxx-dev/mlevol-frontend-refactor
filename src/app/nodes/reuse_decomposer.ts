import { ClassicPreset as Classic } from "rete";
import { DataFrameSocket, ObjectSocket } from "../sockets";
import { InputOptions } from "../dropbox.options";

export class ReuseDecomposeNode extends Classic.Node<
  { input_dataset:  DataFrameSocket,
    decomposer: ObjectSocket
  },
  { output_dataset: DataFrameSocket,
  },
  
  {}
  >
  {
    width = 190;
    height = 150;
    color = "rgba(132, 132, 0, 0.5)";
    public static nodeName: string = "Reuse Decompose";
    info: any = {
      info : {
          title: 'Extracts important features',
      },
      inputs : {
        description: {
          type: "string",
          value: "select nothing"
        },
        dataset_tag: {
          type: "string",
          value: "variable_name",
        }
      },
    };

    constructor() {
      super(ReuseDecomposeNode.nodeName);
  
      this.addInput('input_dataset', new Classic.Input(new DataFrameSocket(), 'data'));
      this.addInput('decomposer', new Classic.Input(new ObjectSocket(), 'decomposer'));
      this.addOutput('output_dataset', new Classic.Output(new DataFrameSocket(), ''));
    }

    data() {
      return this.info;
    }

    getNodeName() {
      return ReuseDecomposeNode.nodeName;
    }

    update() {
    }
  }