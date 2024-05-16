import { ClassicPreset as Classic } from "rete";
import { AnySocket } from "../sockets";

export class OutputNode
  extends Classic.Node<
    { value: AnySocket},
    {},
    {}
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

    this.addInput("value", new Classic.Input(new AnySocket(), this.info.inputs.key.value));
  }

  data() {
    return this.info;
  }

  getNodeName() {
    return OutputNode.nodeName;
  }
  update() {
    this.inputs.value!.label = this.info.inputs.key.value;
  }
}
