import { ClassicPreset as Classic } from "rete";
import { socket } from "../sockets/sockets";

export class NumberNode extends Classic.Node {
    width = 190;
    height = 100;
    color = "rgba(255, 0, 0, 0.5)";
    info = {
      info: {
          title: 'Inputs a number',
      },
      inputs: {
      },
    };
    constructor(initial: number, change?: (value: number) => void) {
      super('Number');
      this.addOutput('value', new Classic.Output(socket, 'Number'));
      this.addControl(
        'value',
        new Classic.InputControl('number', { initial, change })
      );
    }

    data() {
      return {};
    }
  }