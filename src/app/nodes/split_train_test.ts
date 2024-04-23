import { ClassicPreset as Classic } from "rete";
import { socket } from "../sockets/sockets";

export class SplitTrainTestNode extends Classic.Node<
{   source: Classic.Socket,
    tags : Classic.Socket },
{   source_train : Classic.Socket,
    source_test : Classic.Socket,
    tags_train : Classic.Socket,
    tags_test : Classic.Socket},
{}
> implements Classic.Node{
    width = 190;
    height = 200;
    color = "rgba(132, 132, 0, 0.5)";

    info = {
        info: {
            title: 'Split Train Test',
        },
        inputs: {
            percentage: {
                type: "number",
                value: 0.5,
            },
        },
    };

    constructor() {
        super('Split train test');
  
        this.addInput('source', new Classic.Input(socket, 'X'));
        this.addInput('tags', new Classic.Input(socket, 'Y'));

        this.addOutput('source_train', new Classic.Output(socket, 'X_train'));
        this.addOutput('source_test', new Classic.Output(socket, 'X_test'));
        this.addOutput('tags_train', new Classic.Output(socket, 'Y_train'));
        this.addOutput('tags_test', new Classic.Output(socket, 'Y_test'));
    }

    data() {
        return this.info;
      }
  }