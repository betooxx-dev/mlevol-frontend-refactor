import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tool-header',
  templateUrl: './tool-header.component.html',
  styleUrl: './tool-header.component.css'
})
export class ToolHeaderComponent {
  @Input() toolName!: string;
  @Input() toolDescription?: string;
  @Input() iconClass?: string;
}