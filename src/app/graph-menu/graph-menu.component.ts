import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-graph-menu',
  templateUrl: './graph-menu.component.html',
  styleUrl: './graph-menu.component.css'
})
export class GraphMenuComponent {
  expandedGraphMenu : boolean = false;
  showFile : boolean = true;
  showLayers : boolean = false;
  
  @Output() menuExpanded = new EventEmitter<boolean>();
  @Output() menuCollapsed = new EventEmitter<boolean>();

  expandMenu() {
    this.expandedGraphMenu = true;
    this.menuExpanded.emit(true);
  }

  collapseMenu() {
    this.expandedGraphMenu = false;
    this.menuCollapsed.emit(true);
  }

  toggleMenu() {
    if (this.expandedGraphMenu) {
      this.collapseMenu();
    } else {
      this.expandMenu();
    }
  }

  openLayers() {
    this.showLayers = true;
    this.showFile = false;
    this.expandMenu();
  }

  openFile() {
    this.showFile = true;
    this.showLayers = false;
    this.expandMenu();
  }
  
}
