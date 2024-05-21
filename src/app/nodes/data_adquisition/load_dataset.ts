import { ClassicPreset as Classic } from "rete";
import { DataFrameSocket } from "../../sockets";
import { InputOptions } from "../../dropbox.options";

export class LoadDatasetNode extends Classic.Node<
{ },
{ resulting_table: DataFrameSocket},
{}
> implements Classic.Node{
    width = 190;
    height = 90;
    color = "rgba(132, 132, 0, 0.5)";
    public static nodeName: string = "Load dataset";
    info = {
      info: {
          title: 'Load dataset from disc',
      },
      inputs: {
        description :{
          type: "string",
          value: "Dataset description",
        },
        source: {
          type: "option",
          value: InputOptions["dataset_source"][0],
          optionId: "dataset_source",
        },
        path : {
          type: "string",
          value: "Dataset path",
          show:true,
        },
      },
    };

    
    constructor() {
      super('Load Dataset');
      this.addOutput('resulting_table', new Classic.Output(new DataFrameSocket(), ''));
    }

    data() {
      return this.info;
    }

    getNodeName() {
      return LoadDatasetNode.nodeName;
    }
    update() {
      
    }
  }