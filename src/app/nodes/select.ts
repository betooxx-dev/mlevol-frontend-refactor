import { ClassicPreset as Classic } from "rete";
import { socket } from "../sockets/sockets";

export class SelectNode extends Classic.Node<
{ origin_table: Classic.Socket },
{ resulting_table: Classic.Socket},
{}
> implements Classic.Node{
    width = 190;
    height = 80;
    color = "rgba(132, 132, 0, 0.5)";

    info = {
      info: {
          title: 'Select query',
      },
      inputs: {
          description: {
              type: "string",
              value: "select nothing"
          },
          columns: {
              type: "string",
              value: "",
          },
      },
  };

    constructor() {
      super('Select');
  
      this.addInput('origin_table', new Classic.Input(socket, ''));
      this.addOutput('resulting_table', new Classic.Output(socket, ''));
    }

    data() {
      return this.info;
    }
  }