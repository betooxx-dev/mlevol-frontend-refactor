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
  info: any = {
    info: {
        title: 'Input of module',
    },
    inputs: {},
  };

  constructor(initial: string) {
    super("Input");

    this.addControl("key", new Classic.InputControl("text", { initial }));
    this.addOutput("value", new Classic.Output(socket, "Number"));
  }

  data() {
    return {};
  }
}
