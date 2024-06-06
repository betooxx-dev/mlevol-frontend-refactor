import { ClassicPreset as Classic } from "rete";
import { DataFrameSocket } from "../sockets";

export class SplitTrainTestNode extends Classic.Node<
{   features: DataFrameSocket,
    truth: DataFrameSocket,},
{   features_train : DataFrameSocket,
    features_test : DataFrameSocket,
    truth_train : DataFrameSocket,
    truth_test : DataFrameSocket},
{}
> implements Classic.Node{
    width = 190;
    height = 210;
    color = "rgba(132, 132, 0, 0.5)";
    public static nodeName: string = "Split train test";
    info = {
        info: {
            title: 'Split Train Test',
        },
        inputs: {
            train_percentage: {
                type: "number",
                value: 0.25,
                isParam: "custom",
                paramRef: null,
            },
        },
    };

    constructor() {
        super('Split train test');

        this.addInput('features', new Classic.Input(new DataFrameSocket(), 'features'));

        this.addInput('truth', new Classic.Input(new DataFrameSocket(), 'truth'));

        this.addOutput('features_train', new Classic.Output(new DataFrameSocket(), 'features_train'));
        this.addOutput('features_test', new Classic.Output(new DataFrameSocket(), 'features_test'));

        this.addOutput('truth_train', new Classic.Output(new DataFrameSocket(), 'truth_train'));
        this.addOutput('truth_test', new Classic.Output(new DataFrameSocket(), 'truth_test'));
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