import { ClassicPreset as Classic } from "rete";
import { DataFrameSocket } from "../sockets";

export class SplitTrainTestNode extends Classic.Node<
{   data: DataFrameSocket,},
{   
    train : DataFrameSocket,
    test : DataFrameSocket},
{}
> implements Classic.Node{
    width = 190;
    height = 150;
    color = "rgba(132, 132, 0, 0.5)";
    public static nodeName: string = "Split train test";
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

        this.addInput('data', new Classic.Input(new DataFrameSocket(), 'data'));

        this.addOutput('train', new Classic.Output(new DataFrameSocket(), 'train'));
        this.addOutput('test', new Classic.Output(new DataFrameSocket(), 'test'));
    }

    data() {
        return this.info;
    }

    getNodeName() {
        return SplitTrainTestNode.nodeName;
    }

    update() {
    }
  }