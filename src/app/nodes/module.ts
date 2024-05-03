import { ClassicPreset as Classic, NodeEditor } from "rete";
import { socket } from "../sockets/sockets";

export class ModuleNode
  extends Classic.Node<
    Record<string, Classic.Socket>,
    Record<string, Classic.Socket>
  >
  implements Classic.Node {
  width = 180;
  height = 140;
  color: string = "rgba(255, 99, 132, 0.5)";
  public static nodeName: string = "Module";
  info = {
    info: {
        title: 'Contains Module',
    },
    inputs: {
      description :{
        type: "string",
        value: "Module description",
      },
      color :{
        type: "color",
        value: "rgba(255, 99, 132, 0.5)",
        options: [
          { key : "rgba(255, 99, 132, 0.5)"},
          { key : "rgba(54, 162, 235, 0.5)"},
          { key : "rgba(255, 206, 86, 0.5)"},
          { key : "rgba(75, 192, 192, 0.5)"},
          { key : "rgba(153, 102, 255, 0.5)"},
          { key : "rgba(255, 159, 64, 0.5)"},
        ]
      }
    },
  };

  constructor(
    public path: string,
  ) {
    super("Step");
    this.syncPorts([],  []);

  }
  update() {
    this.color = this.info.inputs.color.value;
  }

  syncPorts(inputs: string[], outputs: string[]) {
    Object.keys(this.inputs).forEach((key: keyof typeof this.inputs) =>
      this.removeInput(key)
    );
    Object.keys(this.outputs).forEach((key: keyof typeof this.outputs) =>
      this.removeOutput(key)
    );

    inputs.forEach((key) => {
      this.addInput(key, new Classic.Input(socket, key));
    });
    outputs.forEach((key) => {
      this.addOutput(key, new Classic.Output(socket, key));
    });
    this.height =
      110 +
      25 * (Object.keys(this.inputs).length + Object.keys(this.outputs).length);
  }

  data() {
    return this.info;
  }

  getNodeName() {
    return ModuleNode.nodeName;
  }
}
