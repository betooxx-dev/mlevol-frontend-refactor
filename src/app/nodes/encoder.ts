import { ClassicPreset as Classic } from "rete";
import { DataFrameSocket, ObjectSocket } from "../sockets";

export class EncoderNode extends Classic.Node<
  { input_dataset:  DataFrameSocket},
  { output_dataset: DataFrameSocket,
    encoder: ObjectSocket
  },
  {}
  >
  {
    width = 190;
    height = 150;
    color = "rgba(132, 132, 0, 0.5)";
    public static nodeName: string = "Encoder";
    info: any = {
      info : {
          title: 'Makes numeric some columns, also fits the encoder to be reused',
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
        type: {
          type: "option",
          optionId: "encoder_type",
          value: "OneHotEncoder",
          show: true,
        },
        parameters: {
          type: "string",
          value: "",
        }
      },
    };

    constructor() {
        super(EncoderNode.nodeName);

        this.addInput('input_dataset', new Classic.Input(new DataFrameSocket(), 'data'));
        this.addOutput('output_dataset', new Classic.Output(new DataFrameSocket(), 'converted data'));
        this.addOutput('encoder', new Classic.Output(new ObjectSocket(), 'encoder'));
    }

    data() {
        return this.info;
    }

    getNodeName() {
      return EncoderNode.nodeName;
    }

    update() {
    }
  }