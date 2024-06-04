import { Component, HostListener } from '@angular/core';
import { PanelFocusService } from '../panel-focus.service';

@Component({
  selector: 'app-focus-handler',
  templateUrl: './focus-handler.component.html',
  styleUrl: './focus-handler.component.css'
})
export class FocusHandlerComponent {

  constructor(
    private focusService: PanelFocusService
  ) { }


  @HostListener('document:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.focusService.keyUp(event);
  }
}
