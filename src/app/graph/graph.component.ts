import { Component } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent {
  expandedMenu: boolean = false;

  expandMenu() {
    this.expandedMenu = true;
  }

  collapseMenu() {
    this.expandedMenu = false;
  }
}
