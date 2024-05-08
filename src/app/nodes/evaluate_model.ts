import { ClassicPreset as Classic } from "rete";
import { socket } from "../sockets/sockets";

export class EvaluateModelNode extends Classic.Node<
{ model: Classic.Socket,
  label: Classic.Socket,
  truth: Classic.Socket },
{ },
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
              value: "Evaluation description"
          },
      },
  };

    constructor() {
      super('Evaluate Model');
  
      this.addInput('model', new Classic.Input(socket, 'model'));

      this.addInput('label', new Classic.Input(socket, 'label'));

      this.addInput('truth', new Classic.Input(socket, 'truth'));
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