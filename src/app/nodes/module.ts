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
		title: 'Contains Step',
	};
	
	params = {
		'Stage name' :{
			type: "string",
			value: "Step description",
		},
		color :{
			type: "color",
			value: "rgba(255, 99, 132, 0.75)",
		}
	};

	constructor() {
		super("Step");
		this.syncPorts([],  []);
	}
	update() {
		this.color = this.params.color.value;
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
		this.params = data.params;
	}

	getNodeName() {
		return this.nodeName;
	}
}
