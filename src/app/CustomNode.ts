import { ClassicPreset } from "rete";
import { Socket, Control } from "rete/_types/presets/classic";
export class MyNode<
   Inputs extends {
    [key in string]?: Socket;
} = {
    [key in string]?: Socket;
}, Outputs extends {
    [key in string]?: Socket;
} = {
    [key in string]?: Socket;
}, Controls extends {
    [key in string]?: Control;
} = {
    [key in string]?: Control;
}>
 extends ClassicPreset.Node {
    color!: string;
    info!: {
        info: any,
        inputs: any,
    }

    handleDivClick() {
        // Logic to execute when the div is clicked
        console.log('Div clicked!');
    }
}