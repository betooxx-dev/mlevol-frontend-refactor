import {
	Component,
	Input,
	HostBinding,
	ChangeDetectorRef,
	OnChanges
} from "@angular/core";

@Component({
	selector: "app-result-socket",
	template: `<div></div>`,
	styleUrls: ["./resultSocket.component.css"]
})

export class ResultSocketComponent implements OnChanges {
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
