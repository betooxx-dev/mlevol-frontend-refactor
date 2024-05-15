import {
	Component,
	Input,
	HostBinding,
	ChangeDetectorRef,
	OnChanges
} from "@angular/core";

@Component({
	selector: "app-model-socket",
	template: `<div></div>`,
	styleUrls: ["./modelSocket.component.css"]
})

export class ModelSocketComponent implements OnChanges {
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
