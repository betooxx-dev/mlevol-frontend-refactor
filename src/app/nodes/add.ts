import { ClassicPreset as Classic } from "rete";
import { socket } from "../sockets/sockets";

export class AddNode extends Classic.Node {
    width = 190;
    height = 150;
    color = "rgba(0, 0, 255, 0.5)";

    info: any = {
      info : {
          title: 'Add two numbers',
      },
      inputs : {},
    };

    constructor() {
      super('Add');
  
      this.addInput('a', new Classic.Input(socket, 'A'));
      this.addInput('b', new Classic.Input(socket, 'B'));
      this.addOutput('value', new Classic.Output(socket, 'Number'));
      this.addControl(
        'result',
        new Classic.InputControl('number', { initial: 0, readonly: true })
      );
    }

    data() {
      return {};
    }
  }