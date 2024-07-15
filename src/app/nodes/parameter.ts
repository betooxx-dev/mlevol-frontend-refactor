import { ClassicPreset as Classic } from "rete";

export class ParameterNode extends Classic.Node implements Classic.Node
{
	width = 190;
	height = 150;
	color = "rgba(132, 132, 135, 0.5)";
	nodeName: string = "Parameter";
	info = {
		title: 'Parameter to be reused by other nodes',
	};
	params =  {
		description: {
			type: "string",
			value: "parameter description",
			show: true,
		},
		type : {
			type: "option",
			value: "Number",
			optionId: "parameter_type",
			show: true,
		},
	};

	constructor() {
		super("Parameter");
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
	getNodeName() {
		return this.nodeName;
	}

	update() {
	}
	
}