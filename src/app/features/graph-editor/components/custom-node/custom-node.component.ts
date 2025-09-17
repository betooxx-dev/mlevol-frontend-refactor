import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnChanges,
} from "@angular/core";
import { Node } from "../../editor";

@Component({
  selector: "app-custom-node",
  templateUrl: "./custom-node.component.html",
  styleUrl: "./custom-node.component.css",
})
export class CustomNodeComponent implements OnChanges {
  @Input() data!: Node;
  @Input() emit!: (data: any) => void;
  @Input() rendered!: () => void;

  seed: number = 0;
  inputs_to_show: { [key: string]: string[] } = {};
  inputs_keys: string[] = [];
  @HostBinding("class.selected") get selected() {
    return this.data.selected;
  }

  constructor(private cdr: ChangeDetectorRef) {
    this.cdr.detach();
  }

  ngOnChanges(): void {
    const inputs = this.data.params;
    this.inputs_to_show = {};
    for (const key in inputs) {
      if (inputs[key].show) this.inputs_to_show[key] = inputs[key].value;
    }
    this.inputs_keys = Object.keys(this.inputs_to_show);
    this.cdr.detectChanges();
    requestAnimationFrame(() => this.rendered());
    this.seed++; // force render sockets
  }

  sortByIndex(a: any, b: any) {
    const ai = a.value.index || 0;
    const bi = b.value.index || 0;

    return ai - bi;
  }
}
