import { ClassicPreset } from "rete";

export class ResultSocket extends ClassicPreset.Socket {
	constructor() {
		super("Result");
	}

	isCompatibleWith(socket: ClassicPreset.Socket) {
		return (socket instanceof ResultSocket) || (socket instanceof AnySocket);
	}
}

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
  