import {
	Component,
	Input,
	HostBinding,
	ChangeDetectorRef,
	OnChanges
} from "@angular/core";

@Component({
	selector: "app-obj-socket",
	template: `<div></div>`,
	styleUrls: ["./objSocket.component.css"]
})
export class ObjectSocketComponent implements OnChanges {
	@Input() data!: any;
	@Input() rendered!: any;

	@HostBinding("title") get title() {
		return this.data.name;
	}

	constructor(private cdr: ChangeDetectorRef) {
		this.cdr.detach();
	}

	ngOnChanges(): void {
		this.cdr.detectChanges();
		requestAnimationFrame(() => this.rendered());
	}
}
