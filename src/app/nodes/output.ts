import { ClassicPreset as Classic } from "rete";
import { socket } from "../sockets/sockets";

export class OutputNode
  extends Classic.Node<
    { value: Classic.Socket },
    {},
    { key: Classic.InputControl<"text"> }
  >
  implements Classic.Node {
  width = 180;
  height = 140;
  color : string = "rgb(0, 192, 255)";
  name : string = "Output";
  info = {
    info: {
        title: 'Output of module',
    },
    inputs: {},
  };

  constructor(initial?: string) {
    super("Output");

    if (initial){
      this.addControl("key", new Classic.InputControl("text", { initial }));
    }
    else {
      this.addControl("key", new Classic.InputControl("text", { initial: "key" }));
    }
    this.addInput("value", new Classic.Input(socket, "output"));
  }

  data() {
    return this.info;
  }

}
