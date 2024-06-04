import { ClassicPreset as Classic } from "rete";
import { DataFrameSocket, ModelSocket } from "../sockets";

export class PredictNode extends Classic.Node<
{   model: ModelSocket,
    features: DataFrameSocket},
{   },
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
          path: {
              type: "string",
              value: "Path to the results",
              show: true,
          },
      },
  };

    constructor() {
      super(PredictNode.nodeName);
  
      this.addInput('model', new Classic.Input(new ModelSocket(), 'model'));
      this.addInput('features', new Classic.Input(new DataFrameSocket(), 'features'));
    }

  /**
   * Returns the data stored in the `info` property of the current object.
   *
   * @return {any} The data stored in the `info` property.
   */
  data() {
      return this.info;
    }

    getNodeName() {
      return PredictNode.nodeName;
    }

    update() {
    }
    
  }