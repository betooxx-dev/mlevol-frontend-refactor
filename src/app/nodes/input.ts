import { ClassicPreset as Classic } from "rete";
import { socket } from "../sockets/sockets";
import { MyNode } from "../CustomNode";
export class InputNode   extends Classic.Node<
{},
{ value: Classic.Socket },
{ key: Classic.InputControl<"text"> }
>
implements Classic.Node

{
  width = 180;
  height = 140;
  value: any = null;
  color: string = "rgb(0, 192, 255)";
  name: string = "Input";
  info: any = {
    info: {
        title: 'Input of module',
    },
    inputs: {
      key: {
        type: "string",
        value: "key",
      },
    },
  };

  constructor(initial?: string) {
    super("Input");

    if (!initial){
      this.addControl("key", new Classic.InputControl("text", { initial}));
    }
    else {
      this.addControl("key", new Classic.InputControl("text", { initial: "key"}));
    }
    
    this.addOutput("value", new Classic.Output(socket, "Number"));
  }

  data() {
    return this.info;
  }
}
