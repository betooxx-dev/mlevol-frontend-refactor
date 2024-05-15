import { ClassicPreset } from "rete";

export const socket = new ClassicPreset.Socket("socket");

export class DataFrameSocket extends ClassicPreset.Socket {
	constructor() {
		super("DataFreme");
	}

	isCompatibleWith(socket: ClassicPreset.Socket) {
		return (socket instanceof DataFrameSocket) || (socket instanceof AnySocket);
	}
}
  
export class ModelSocket extends ClassicPreset.Socket {
	constructor() {
		super("model");
	}

	isCompatibleWith(socket: ClassicPreset.Socket) {
		return (socket instanceof ModelSocket) || (socket instanceof AnySocket);
	}
}

export class AnySocket extends ClassicPreset.Socket {
	constructor() {
		super("Any");
	}

	isCompatibleWith(socket: ClassicPreset.Socket) {
		return true;
	}
}
  