import { ClassicPreset as Classic } from "rete";
import { socket } from "../sockets/sockets";

export class TrainModelNode extends Classic.Node<
{ labels: Classic.Socket,
  truth: Classic.Socket },
{ model: Classic.Socket},
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
          type: "string",
          value: "Clasiffier",
        },
        parameters :{
          type: "string",
          value: "",
        },
      },
    };
  
    constructor() {
      super('Train model');
  
      this.addInput('labels', new Classic.Input(socket, 'labels'));
      this.addInput('truth', new Classic.Input(socket, 'truth'));
      this.addOutput('model', new Classic.Output(socket, 'model'));
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