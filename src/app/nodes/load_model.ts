import { ClassicPreset as Classic } from "rete";
import { ModelSocket } from "../sockets";
import { InputOptions } from "../dropbox.options";

export class LoadModelNode extends Classic.Node<
{ },
{ resulting_model: ModelSocket},
{}
> implements Classic.Node{
    width = 190;
    height = 120;
    color = "rgba(132, 132, 0, 0.5)";
    public static nodeName: string = "Load model";
    info = {
      info: {
          title: 'Load model from disc',
      },
      inputs: {
        description :{
          type: "string",
          value: "Model description",
        },
        source: {
          type: "option",
          value: InputOptions["model_source"][0],
          optionId: "model_source",
        },
        path : {
          type: "string",
          value: "Model path",
          show: true,
        },
        model_tag: {
          type: "string",
          value: "variable_name",
        }
      },
    };

    
    constructor() {
      super('Load Model');
      this.addOutput('resulting_model', new Classic.Output(new ModelSocket(), ''));
    }

    data() {
      return this.info;
    }

    getNodeName() {
      return LoadModelNode.nodeName;
    }
    update() {
    }
  }