import { ClassicPreset as Classic } from "rete";
import { socket } from "../sockets/sockets";

export class LoadDatasetNode extends Classic.Node<
{ },
{ resulting_table: Classic.Socket},
{}
> implements Classic.Node{
    width = 190;
    height = 120;
    color = "rgba(132, 132, 0, 0.5)";
    name: string = "Load dataset";
    info = {
      info: {
          title: 'Load dataset from disc',
      },
      inputs: {
        description :{
          type: "string",
          value: "Dataset description",
        },
      },
    };

    
    constructor() {
      super('Load Dataset');
      this.addOutput('resulting_table', new Classic.Output(socket, ''));
    }

    data() {
      return this.info;
    }
  }