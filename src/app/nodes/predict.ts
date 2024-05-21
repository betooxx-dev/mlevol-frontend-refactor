import { ClassicPreset as Classic } from "rete";
import { DataFrameSocket, ModelSocket } from "../sockets";

export class PredictNode extends Classic.Node<
{   model: ModelSocket,
    features: DataFrameSocket},
{   results: DataFrameSocket},
{}
> implements Classic.Node{
    width = 190;
    height = 200;
    color = "rgba(132, 132, 0, 0.5)";
    public static nodeName: string = "Predict";
    info = {
      info: {
          title: 'Uses a model to predict',
      },
      inputs: {
          description: {
              type: "string",
              value: "Prediciton description",
              show: true,
          },
      },
  };

    constructor() {
      super(PredictNode.nodeName);
  
      this.addInput('model', new Classic.Input(new ModelSocket(), 'model'));

      this.addInput('features', new Classic.Input(new DataFrameSocket(), 'features'));

      this.addOutput('results', new Classic.Input(new DataFrameSocket(), 'truth'));
    }

    data() {
      return this.info;
    }

    getNodeName() {
      return PredictNode.nodeName;
    }

    update() {
    }
    
  }