import { ClassicPreset as Classic } from "rete";
import { DataFrameSocket } from "../sockets";

export class SplitTrainTestNode extends Classic.Node<
{   source: DataFrameSocket,
    tags : DataFrameSocket },
{   source_train : DataFrameSocket,
    source_test : DataFrameSocket,
    tags_train : DataFrameSocket,
    tags_test : DataFrameSocket},
{}
> implements Classic.Node{
    width = 190;
    height = 200;
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
  
        this.addInput('source', new Classic.Input(new DataFrameSocket(), 'X'));
        this.addInput('tags', new Classic.Input(new DataFrameSocket(), 'Y'));

        this.addOutput('source_train', new Classic.Output(new DataFrameSocket(), 'X_train'));
        this.addOutput('source_test', new Classic.Output(new DataFrameSocket(), 'X_test'));
        this.addOutput('tags_train', new Classic.Output(new DataFrameSocket(), 'Y_train'));
        this.addOutput('tags_test', new Classic.Output(new DataFrameSocket(), 'Y_test'));
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