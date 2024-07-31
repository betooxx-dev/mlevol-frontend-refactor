import { ClassicPreset as Classic, NodeEditor } from "rete";
import { CustomSocket } from "../sockets";
import { ConfigurationService } from "../configuration.service";
import { getSocket } from "../utils";
import { getColorFromCategory } from "../utils";
export class CustomNode
    extends Classic.Node<
    Record<string, CustomSocket>,
    Record<string, CustomSocket>
  > implements Classic.Node{
    width = 180;
    height = 200;
    color : string = "rgba(130, 99, 132, 0.75)";
    nodeName: string;
    info : any = {};
    params : any = {};
    constructor(nodeName: string, config: any) {
        super(nodeName);
        
        this.nodeName = nodeName;
        this.info = config.info;
        this.color = getColorFromCategory(config.category!);
        if (config.color!) this.color = config.color;
        
        let show_count = 0;
        for (let i = 0; i < config.params.length; i++) {
            let param = config.params[i];
            this.params[param.param_label] = {
                type : param.param_type,
                show : param.show,
                value : undefined,
                optionId : param.optionId!,
                isParam: "custom",
            }
            if (param.show) show_count++;
        }

        for ( let i = 0; i < config.inputs.length; i++) {
            let input = config.inputs[i];
            this.addInput(input.port_label, new Classic.Input(getSocket(input.port_type), input.port_label));
        }

        for ( let i = 0; i < config.outputs.length; i++) {
            let output = config.outputs[i];
            this.addOutput(output.port_label, new Classic.Output(getSocket(output.port_type), output.port_label));
        }

        this.height = 45 + 27.5 * (Object.keys(this.inputs).length + Object.keys(this.outputs).length) + 25 * show_count;
    }

    data() {
        return {
            info: this.info,
            params: this.params
        };
    }

	setData(data: any) {
        this.info = data.info;
		this.params = data.params;
	}

    update() {
        let total_lines = 0;    
        // iterate through params
        for (var m in this.params) {
            if (this.params[m].show) {
                total_lines++;
                var value_length = String(this.params[m].value).length;
                if (value_length > 16){
                    value_length -= 16;
                    total_lines++;
                }
                total_lines += String(value_length).length / 25;
            }
        }
        console.log(total_lines);   
        this.height = 45 + 27.5 * (Object.keys(this.inputs).length + Object.keys(this.outputs).length) + 25 * total_lines;
    }

    getNodeName() {
        return this.nodeName;
    }
}