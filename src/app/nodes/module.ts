import { ClassicPreset as Classic, NodeEditor } from "rete";
import { socket } from "../sockets/sockets";
import { Module, Modules } from "../modules";
import { Schemes } from "../editor";

export class ModuleNode
  extends Classic.Node<
    Record<string, Classic.Socket>,
    Record<string, Classic.Socket>
  >
  implements Classic.Node {
  width = 180;
  height = 140;
  module: null | Module<Schemes> = null;
  color: string = "rgba(123, 235, 12, 0.5)";
  
  info = {
    info: {
        title: 'Contains Module',
    },
    inputs: {
      description :{
        type: "string",
        value: "Module description",
      },
    },
  };

  constructor(
    public path: string,
  ) {
    super("Module");

    this.addInput("input", new Classic.Input(socket, "base_input"));

    this.addOutput("output", new Classic.Input(socket, "base_output"));

  }

  async update() {
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
    return {};
  }

  

  serialize() {
    return;
  }
}
