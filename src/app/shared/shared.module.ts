import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SmallHeaderComponent } from "./components/small-header/small-header.component";
import { ButtonModule } from "primeng/button";
@NgModule({
  declarations: [SmallHeaderComponent],
  imports: [CommonModule, ButtonModule],
  exports: [SmallHeaderComponent],
})
export class SharedModule {}
