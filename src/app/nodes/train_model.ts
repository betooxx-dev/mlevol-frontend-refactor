import { ClassicPreset as Classic } from "rete";
import { DataFrameSocket, ModelSocket } from "../sockets";

export class TrainModelNode extends Classic.Node<
{ labels: DataFrameSocket,
  truth: DataFrameSocket },
{ model: ModelSocket },
{}
> implements Classic.Node{
    width = 190;
    height = 140;
    color = "rgba(132, 132, 0, 0.5)";
    public static nodeName: string = "TrainModelNode";
    info = {
      info: {
          title: 'Trains a NN model',
      },
      inputs: {
        description :{
          type: "string",
          value: "Train description",
        },
        type :{
          type: "option_of_options",
          value: "Clasiffier",
          optionId: "model_type",
        },
        parameters :{
          type: "string",
          value: "",
        },
      },
    };
  
    constructor() {
      super('Train model');
  
      this.addInput('labels', new Classic.Input(new DataFrameSocket(), 'labels'));
      this.addInput('truth', new Classic.Input(new DataFrameSocket(), 'truth'));
      this.addOutput('model', new Classic.Output(new ModelSocket(), 'model'));
    }

    data() {
      return this.info;
    }
    getNodeName() {
      return TrainModelNode.nodeName;
    }
    update() {
    }
  }