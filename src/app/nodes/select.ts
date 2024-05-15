import { ClassicPreset as Classic } from "rete";
import { DataFrameSocket, socket } from "../sockets/sockets";

export class SelectNode extends Classic.Node<
{ origin_table: Classic.Socket },
{ resulting_table: Classic.Socket},
{}
> implements Classic.Node{
    width = 190;
    height = 100;
    color = "rgba(132, 132, 0, 0.5)";
    public static nodeName: string = "Select";
    info = {
      info: {
          title: 'Select query',
      },
      inputs: {
          description: {
              type: "string",
              value: "select nothing"
          },
          key: {
              type: "string",
              value: "",
          },
          columns: {
              type: "string",
              value: "",
          },
      },
  };

    constructor() {
      super('Select');
  
      this.addInput('origin_table', new Classic.Input(new DataFrameSocket(), ''));
      this.addOutput('resulting_table', new Classic.Output(new DataFrameSocket(), ''));
    }

    data() {
      return this.info;
    }

    getNodeName() {
      return SelectNode.nodeName;
    }

    update() {
    }
    
  }