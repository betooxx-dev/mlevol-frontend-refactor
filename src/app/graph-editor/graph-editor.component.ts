import { AfterViewInit, Component, ElementRef, Injector, ViewChild } from '@angular/core'

import { createEditor } from '../rete'

@Component({
  selector: 'app-graph-editor',
  templateUrl: './graph-editor.component.html',
  styleUrl: './graph-editor.component.css'
})
export class GraphEditorComponent {
  @ViewChild('rete') container!: ElementRef<HTMLElement>

  constructor(private injector: Injector) { }

  async ngAfterViewInit() {
    await createEditor(this.container.nativeElement, this.injector)
  }
}
