import { ClassicPreset as Classic } from "rete";
import { AnySocket } from "../sockets";
import { getSocket } from "../utils";
export class InputNode   extends Classic.Node
implements Classic.Node

{
  width = 190;
  height = 110;
  value: any = null;
  color: string = "rgb(0, 192, 255)";
  public static nodeName: string = "Input";
  info: any = {
    info: {
        title: 'Input of module',
    },
    inputs: {
      description: {
        type: "string",
        value: "",
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

  pre_type: string;
  constructor(initial?: string) {
    super("Input");
    
    this.addOutput("value", new Classic.Output(getSocket(this.info.inputs.type.value), this.info.inputs.key.value));
    this.pre_type = this.info.inputs.type.value;
  }

  data() {
    return this.info;
  }
  getNodeName() {
    return InputNode.nodeName;
  }
  update() {
    this.outputs["value"]!.label = this.info.inputs.key.value;
    if (this.pre_type != this.info.inputs.type.value)
    {
      this.removeOutput("value");
      this.addOutput("value", new Classic.Output(getSocket(this.info.inputs.type.value), this.info.inputs.key.value));
      this.pre_type = this.info.inputs.type.value;
    }
  }
}
