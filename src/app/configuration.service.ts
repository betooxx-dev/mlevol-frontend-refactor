// configuration.service.ts

import { Injectable } from '@angular/core';
import OptionsJSON from '../assets/options.json';
import SocketJSON from '../assets/sockets.json';
import NodesJSON from '../assets/nodes.json';
@Injectable({
  	providedIn: 'root'
})
export class ConfigurationService {
	options : any;
	options_of_options : any;
	nodes : any;
	sockets : any;

	constructor() {

		this.options = OptionsJSON["options"];
		this.options_of_options = OptionsJSON["option_of_options"];
		
		this.nodes = NodesJSON["nodes"];

		this.sockets = SocketJSON;
	}

	getOptions(key : string) {
		if (key in this.options)
			return this.options[key];
		return []
	}

	getOptionsOfOptions(key : string) {
		if (key in this.options_of_options)
			return this.options_of_options[key];
		return {}
	}

	getNode(key : string) {
		for (let i = 0; i < this.nodes.length; i++) {
			if (this.nodes[i]["node"] == key)
				return this.nodes[i];
		}
		return {}
	}

	getAvailableNodes() {
		let result: Map<string, string[]> = new Map();
		for (let i = 0; i < this.nodes.length; i++) {
			let node_cat = this.nodes[i].category;
			result.set(node_cat, [])
		}
		for (let i = 0; i < this.nodes.length; i++) {
			let node_cat = this.nodes[i].category;
			result.get(node_cat)?.push(this.nodes[i]["node"]);
		}
		
		console.log(result)

		return result;
	}

	getSocket(key : string) {
		if (key in this.sockets)
			return this.sockets[key];
		return this.sockets["Unknown"]
	}
}