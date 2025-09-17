import { ClassicPreset as Classic } from "rete";
import { getSocket } from "@app/shared/utils";

export class OutputNode extends Classic.Node implements Classic.Node {
  width = 180;
  height = 90;
  color: string = "rgb(0, 192, 255)";
  nodeName: string = "Output";
  info = {
    title: "Output of module",
  };
  params = {
    description: {
      type: "description",
      value: "",
      show: true,
    },
    key: {
      type: "description",
      value: "key",
    },
    type: {
      type: "option",
      value: "Any",
      optionId: "socket_type",
    },
  };

  pre_type: string;

  constructor(nodeName?: string) {
    super("Output");

    this.addInput(
      "value",
      new Classic.Input(
        getSocket(this.params.type.value),
        this.params.key.value
      )
    );
    this.pre_type = this.params.type.value;
    this.height =
      80 +
      25 * (Object.keys(this.inputs).length + Object.keys(this.outputs).length);
  }

  data() {
    return {
      info: this.info,
      params: this.params,
    };
  }

  setData(data: any) {
    this.info = data.info;
    this.params = data.params;
  }

  getNodeName() {
    return this.nodeName;
  }
  update() {
    this.inputs["value"]!.label = this.params.key.value;
    if (this.pre_type != this.params.type.value) {
      this.removeInput("value");
      this.addInput(
        "value",
        new Classic.Input(
          getSocket(this.params.type.value),
          this.params.key.value
        )
      );
      this.pre_type = this.params.type.value;
    }
  }
}
