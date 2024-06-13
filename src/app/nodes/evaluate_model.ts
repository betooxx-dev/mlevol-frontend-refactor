import { ClassicPreset as Classic } from "rete";
import { DataFrameSocket, ModelSocket, ResultSocket } from "../sockets";

export class EvaluateModelNode extends Classic.Node<
{ model: ModelSocket,
  features: DataFrameSocket,
  truth: DataFrameSocket },
{ results: ResultSocket},
{}
> implements Classic.Node{
    width = 190;
    height = 200;
    color = "rgba(132, 132, 0, 0.5)";
    public static nodeName: string = "Evaluate";
    info = {
      info: {
          title: 'Evaluates model',
      },
      inputs: {
          description: {
              type: "string",
              value: "Evaluation description",
              show: true,
          },
      },
  };

    constructor() {
      super('Evaluate Model');
  
      this.addInput('model', new Classic.Input(new ModelSocket(), 'model'));

      this.addInput('features', new Classic.Input(new DataFrameSocket(), 'features'));

      this.addInput('truth', new Classic.Input(new DataFrameSocket(), 'truth'));

      this.addOutput('results', new Classic.Input(new ResultSocket(), 'results'));
    }

    data() {
      return this.info;
    }

    getNodeName() {
      return EvaluateModelNode.nodeName;
    }

    update() {
    }
    
  }