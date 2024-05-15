import { ClassicPreset as Classic } from "rete";
import { AnySocket, socket } from "../sockets/sockets";
import { MyNode } from "../CustomNode";
export class InputNode   extends Classic.Node<
{},
{ value: Classic.Socket },
{}
>
implements Classic.Node

{
  width = 180;
  height = 140;
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
        value: "Input description",
      },
      key: {
        type: "string",
        value: "key",
      },
    },
  };

  constructor(initial?: string) {
    super("Input");
    
    this.addOutput("value", new Classic.Output(new AnySocket(), this.info.inputs.key.value));
  }

  data() {
    return this.info;
  }
  getNodeName() {
    return InputNode.nodeName;
  }
  update() {
    this.outputs.value!.label = this.info.inputs.key.value;
  }
}
