import { ClassicPreset as Classic } from "rete";
import { getSocket } from "../utils";

export class OutputNode
  extends Classic.Node
  implements Classic.Node {
  width = 100;
  height = 90;
  color : string = "rgb(0, 192, 255)";
  public static nodeName : string = "Output";
  info = {
    info: {
        title: 'Output of module',
    },
    inputs: {
      description: {
        type: "string",
        value: "",
        show: true,
      },
      key: {
        type: "string",
        value: "key",
      },
      type: {
        type: "option",
        value: "Any",
        optionId: "socket_type",
      }
    },
  };

  
  pre_type:string;

  constructor(initial?: string) {
    super("Output");

    this.addInput("value", new Classic.Input(getSocket(this.info.inputs.type.value), this.info.inputs.key.value));
    this.pre_type = this.info.inputs.type.value;

  }

  data() {
    return this.info;
  }

  getNodeName() {
    return OutputNode.nodeName;
  }
  update() {
    this.inputs["value"]!.label = this.info.inputs.key.value;
    if (this.pre_type != this.info.inputs.type.value)
    {
      this.removeInput("value");
      this.addInput("value", new Classic.Input(getSocket(this.info.inputs.type.value), this.info.inputs.key.value));
      this.pre_type = this.info.inputs.type.value;
    }
  }
}
