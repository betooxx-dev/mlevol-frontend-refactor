import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-feature-button",
  templateUrl: "./feature-button.component.html",
  styleUrl: "./feature-button.component.css",
})
export class FeatureButtonComponent {
  @Input() iconClass!: string;
  @Input() header!: string;
  @Input() text!: string;
  @Input() routePath!: string;
  constructor(private router: Router) {}

  onClick() {
    if (this.routePath) {
      this.router.navigate([this.routePath]);
    }
  }
}
