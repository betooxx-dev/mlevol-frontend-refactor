import { ClassicPreset as Classic } from "rete";
import { socket } from "../sockets/sockets";

export class NumberNode extends Classic.Node {
    width = 190;
    height = 100;
    color = "rgba(255, 0, 0, 0.5)";
    public static nodeName: string = "Number";
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
      return this.info;
    }

    getNodeName() {
      return NumberNode.nodeName;
    }
    update() {
    }
  }