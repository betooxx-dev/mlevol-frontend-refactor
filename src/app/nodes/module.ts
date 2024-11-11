import { ClassicPreset as Classic, NodeEditor } from "rete";
import { getSocket } from "../utils";
import { CustomSocket } from "../sockets";

export class ModuleNode
extends Classic.Node<
	Record<string, CustomSocket>,
	Record<string, CustomSocket>>
	implements Classic.Node
	{
	width = 180;
	height = 140;
	color: string = "rgba(255, 99, 132, 0.75)";
	nodeName: string = "Step";
	info = {
		title: 'Contains steps',
	};
	
	params : any = {
		'Stage name' :{
			type: "description",
			value: "Stage title",
		},
		color :{
			type: "color",
			value: "rgba(255, 99, 132, 0.75)",
		},
		link : {
			type: "link",
			value : "",
		}
	};

	constructor() {
		super("Step");
		this.syncPorts([],  []);
	}
	update() {
		this.color = this.params.color.value;
	}

	getName() {
		return this.params['Stage name'].value;
	}

	setParam(key : string, value : any){
		this.params[key].value = value
	}

	setName(name : string){
		this.params['Stage name'].value = name
	}

	getColor() {
		return this.params.color.value;
	}

	syncPorts(inputs: [string, string][], outputs: [string, string][]) {
		Object.keys(this.inputs).forEach((key: keyof typeof this.inputs) =>
			this.removeInput(key)
		);
		Object.keys(this.outputs).forEach((key: keyof typeof this.outputs) =>
			this.removeOutput(key)
		);

		inputs.forEach((key) => {
			this.addInput(key[0], new Classic.Input(getSocket(key[1]), key[0]));
		});
		outputs.forEach((key) => {
			this.addOutput(key[0], new Classic.Output(getSocket(key[1]), key[0]));
		});
		this.height =
		45 +
		27.5 * (Object.keys(this.inputs).length + Object.keys(this.outputs).length);
	}

	data() {
		return {
			info: this.info,
			params: this.params
		};
	}

	setData(data: any) {
		this.info = data.info;
		for (let key in this.params) {
			if (key in data.params) {
				this.params[key].value = data.params[key].value;
			}
		}
	}

	getNodeName() {
		return this.nodeName;
	}
}
