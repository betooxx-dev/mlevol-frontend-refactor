import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./shared";
import { FeatureButtonComponent } from "./shared";
import { AccordionModule } from "primeng/accordion";
import { TooltipModule } from "primeng/tooltip";
import { InputTextModule } from "primeng/inputtext";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { SplitButtonModule } from "primeng/splitbutton";
import { TableModule } from "primeng/table";
import { KnobModule } from "primeng/knob";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { MessageService } from "primeng/api";

@NgModule({
  declarations: [AppComponent, HeaderComponent, FeatureButtonComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule,
    TooltipModule,
    InputTextModule,
    ScrollPanelModule,
    SplitButtonModule,
    TableModule,
    KnobModule,
    DynamicDialogModule,
  ],
  providers: [provideAnimationsAsync(), MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
