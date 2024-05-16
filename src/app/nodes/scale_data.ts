import { ClassicPreset as Classic } from "rete";
import { DataFrameSocket } from "../sockets";
import { InputOptions } from "../dropbox.options";

export class ScaleDataNode extends Classic.Node<
  { input_dataset:  DataFrameSocket},
  { output_dataset: DataFrameSocket},
  {}
  >
  {
    width = 190;
    height = 150;
    color = "rgba(132, 132, 0, 0.5)";
    public static nodeName: string = "Scale Columns";
    info: any = {
      info : {
          title: 'Scales data',
      },
      inputs : {
        description: {
          type: "string",
          value: "scale nothing"
        },
        columns: {
            type: "string",
            value: "",
        },
        type: {
          type: "option",
          optionId: "scale_type",
          value: InputOptions["scale_type"][0],
          show: true,
        }
      },
    };

    constructor() {
      super('Scale data');
  
      this.addInput('input_dataset', new Classic.Input(new DataFrameSocket(), ''));
      this.addOutput('output_dataset', new Classic.Output(new DataFrameSocket(), ''));
    }

    data() {
      return this.info;
    }

    getNodeName() {
      return ScaleDataNode.nodeName;
    }

    update() {
    }
  }