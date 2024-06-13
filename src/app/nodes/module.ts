import { ClassicPreset as Classic, NodeEditor } from "rete";
import { AnySocket } from "../sockets";
import { getSocket } from "../utils";

export class ModuleNode
  extends Classic.Node<
    Record<string, Classic.Socket>,
    Record<string, Classic.Socket>
  >
  implements Classic.Node {
  width = 180;
  height = 140;
  color: string = "rgba(255, 99, 132, 0.75)";
  public static nodeName: string = "Step";
  info = {
    info: {
        title: 'Contains Step',
    },
    inputs: {
      description :{
        type: "string",
        value: "Step description",
      },
      color :{
        type: "color",
        value: "rgba(255, 99, 132, 0.75)",
      }
    },
  };

  constructor() {
    super("Step");
    this.syncPorts([],  []);

  }
  update() {
    this.color = this.info.inputs.color.value;
  }

  syncPorts(inputs: [string, string][], outputs: [string, string][]) {
    console.log("syncPorts", inputs, outputs);
    Object.keys(this.inputs).forEach((key: keyof typeof this.inputs) =>
      this.removeInput(key)
    );
    Object.keys(this.outputs).forEach((key: keyof typeof this.outputs) =>
      this.removeOutput(key)
    );

    inputs.forEach((key) => {
      this.addInput(key[0], new Classic.Input(getSocket(key[1]), key[0]));
    });
    outputs.forEach((key) => {
      this.addOutput(key[0], new Classic.Output(getSocket(key[1]), key[0]));
    });
    this.height =
      80 +
      25 * (Object.keys(this.inputs).length + Object.keys(this.outputs).length);
  }

  data() {
    return this.info;
  }

  getNodeName() {
    return ModuleNode.nodeName;
  }
}
