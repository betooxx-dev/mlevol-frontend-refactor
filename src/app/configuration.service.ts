// configuration.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, first, Observable, tap } from 'rxjs';
@Injectable({
  	providedIn: 'root'
})
export class ConfigurationService {
	options : any;
	options_of_options : any;
	nodes : any;
	sockets : any;
	semaphor : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	constructor() {
		this.initClass();
	}

	async initClass() {
		const response = await fetch("https://gessi.cs.upc.edu:1446/api/get_config", { // FIXME: Hardcoded URL
		//const response = await fetch("http://localhost:5000/api/get_config", { // FIXME: Hardcoded URL
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		})
		const json = await response.json()

		console.log(json);
		this.options = json["options"]["options"];
		this.options_of_options = json["options"]["option_of_options"];
		this.nodes = json["nodes"]["nodes"];
		this.sockets = json["sockets"];

		this.semaphor.next(true);
		this.semaphor.complete();
		console.log(this)
	}



	getOptions(key : string) {
		if (key in this.options)
			return this.options[key];
		return []
	}

	getAllOptions() {
		return this.options
	}

	getAllOptionsOfOptions() {
		return this.options_of_options
	}

	getOptionsOfOptions(key : string) {
		if (key in this.options_of_options)
			return this.options_of_options[key];
		return {}
	}

	getNode(key : string) {
		console.log("Getting node: " + key);
		console.log(this.sockets);
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

		return result;
	}

	getSocket(key : string) {
		if (key in this.sockets)
			return this.sockets[key];
		return this.sockets["Unknown"]
	}

	getNodes() {
		return this.nodes;
	}

	waitForFetch() : Promise<void> {
		if (this.semaphor.getValue() === true) {
		  return Promise.resolve();
		}
	
		return this.semaphor.pipe(
			filter(value => value === true),
			first(),
			tap(value => console.log(`BehaviorSubject emitted: ${value}`))
		  ).toPromise().then(() => {});
	  }
}