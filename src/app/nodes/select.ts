import { ClassicPreset as Classic } from "rete";
import { DataFrameSocket } from "../sockets";

export class SelectNode extends Classic.Node<
{ origin_table: DataFrameSocket },
{ resulting_table: DataFrameSocket},
{}
> implements Classic.Node{
    width = 190;
    height = 120;
    color = "rgba(132, 132, 0, 0.5)";
    public static nodeName: string = "Select Columns";
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
      super(SelectNode.nodeName);
  
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