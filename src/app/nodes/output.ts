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
  public static nodeName : string = "Output";
  info = {
    info: {
        title: 'Output of module',
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
    super("Output");

    this.addInput("value", new Classic.Input(socket, "out"));
  }

  data() {
    return this.info;
  }

  getNodeName() {
    return OutputNode.nodeName;
  }
  update() {
  }
}
