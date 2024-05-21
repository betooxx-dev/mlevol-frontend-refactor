import { ClassicPreset as Classic } from "rete";
import { DataFrameSocket, ObjectSocket } from "../sockets";
import { InputOptions } from "../dropbox.options";

export class ReuseScaleDataNode extends Classic.Node<
  { input_dataset:  DataFrameSocket,
    scaler: ObjectSocket
  },
  { output_dataset: DataFrameSocket,
    
  },
  {}
  >
  {
    width = 190;
    height = 150;
    color = "rgba(132, 132, 0, 0.5)";
    public static nodeName: string = "ReScale Columns";
    info: any = {
      info : {
          title: 'Scales data using a pre-trained scaler',
      },
      inputs : {
        description: {
          type: "string",
          value: "scale nothing",
          show: true,
        },
      },
    };

    constructor() {
      super('Scale data');
  
      this.addInput('input_dataset', new Classic.Input(new DataFrameSocket(), 'data'));
      this.addOutput('output_dataset', new Classic.Output(new DataFrameSocket(), ''));
      this.addInput('scaler', new Classic.Input(new ObjectSocket(), 'sclaer'));
    }

    data() {
      return this.info;
    }

    getNodeName() {
      return ReuseScaleDataNode.nodeName;
    }

    update() {
    }
  }