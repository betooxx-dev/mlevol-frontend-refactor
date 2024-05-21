import { ClassicPreset as Classic } from "rete";
import { DataFrameSocket, ObjectSocket } from "../sockets";

export class ReuseEncoderNode extends Classic.Node<
  { input_dataset:  DataFrameSocket
    encoder: ObjectSocket
  },
  { output_dataset: DataFrameSocket,
  },
  {}
  >
  {
    width = 190;
    height = 150;
    color = "rgba(132, 132, 0, 0.5)";
    public static nodeName: string = "Reuse Encoder";
    info: any = {
      info : {
          title: 'Makes numeric some columns',
      },
      inputs : {
        description: {
          type: "string",
          value: "change nothing",
          show: true,
        },
        columns: {
            type: "string",
            value: "",
        },
      },
    };

    constructor() {
        super(ReuseEncoderNode.nodeName);

        this.addInput('input_dataset', new Classic.Input(new DataFrameSocket(), 'data'));
        this.addInput('encoder', new Classic.Input(new ObjectSocket(), 'encoder'));
        this.addOutput('output_dataset', new Classic.Output(new DataFrameSocket(), 'converted data'));
    }

    data() {
        return this.info;
    }

    getNodeName() {
      return ReuseEncoderNode.nodeName;
    }

    update() {
    }
  }