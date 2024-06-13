import { ClassicPreset } from "rete";

export class CustomSocket extends ClassicPreset.Socket {
	constructor(name: string) {
		super(name);
	}

	isCompatibleWith(socket: ClassicPreset.Socket) {
		if (this.name === "Any") return true;
		return (socket.name === this.name) || (socket.name === "Any");
	}
}