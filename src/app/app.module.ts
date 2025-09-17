import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AboutComponent } from "./features/home/components/about/about.component";
import { HomeComponent } from "./features/home/components/home/home.component";
import { HeaderComponent } from "./shared";
import { SmallHeaderComponent } from "./shared";

import { FeatureButtonComponent } from "./shared";

import { GraphComponent } from "./features/graph-editor/components/graph/graph.component";
import { GraphMenuComponent } from "./features/graph-editor/components/graph-menu/graph-menu.component";
import { GraphEditorComponent } from "./features/graph-editor";
import { GraphLayersComponent } from "./features/graph-editor/components/graph-layers/graph-layers.component";
import { GraphPropertiesComponent } from "./features/graph-editor/components/graph-properties/graph-properties.component";

import { CodeAssessComponent } from "./features/code-assessment/components/code-assess/code-assess.component";

import { ReteModule } from "rete-angular-plugin/17";

import { CustomNodeComponent } from "./features/graph-editor";
import { ModelNodeComponent } from "./features/graph-editor/components/custom-node/model-node.component";

import { CustomConnectionComponent } from "./features/graph-editor";

import { DialogModule } from "primeng/dialog";
import { AccordionModule } from "primeng/accordion";
import { TooltipModule } from "primeng/tooltip";
import { FloatLabelModule } from "primeng/floatlabel";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { SelectButtonModule } from "primeng/selectbutton";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { SplitButtonModule } from "primeng/splitbutton";
import { TableModule } from "primeng/table";
import { KnobModule } from "primeng/knob";
import { DynamicDialogModule } from "primeng/dynamicdialog";

import { CustomSocketComponent } from "./features/graph-editor/components/custom-socket";

import { FocusHandlerComponent } from "./features/graph-editor/components/focus-handler/focus-handler.component";
import { MessageService } from "primeng/api";
import { CodeAssessFetchingComponent } from "./features/code-assessment/components/code-assess-fetching/code-assess-fetching.component";
import { CodeAssessResponseComponent } from "./features/code-assessment/components/code-assess-response/code-assess-response.component";
import { GraphFileComponent } from "./features/graph-editor/components/graph-file/graph-file.component";
import { TemplateDialogComponent } from "./features/graph-editor/components/graph-file/template-dialog/template-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    HeaderComponent,
    GraphComponent,
    GraphMenuComponent,
    GraphEditorComponent,
    GraphLayersComponent,
    FeatureButtonComponent,
    CustomNodeComponent,
    ModelNodeComponent,
    CustomSocketComponent,
    CustomConnectionComponent,
    GraphPropertiesComponent,
    FocusHandlerComponent,
    CodeAssessComponent,
    SmallHeaderComponent,
    CodeAssessFetchingComponent,
    CodeAssessResponseComponent,
    GraphFileComponent,
    TemplateDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    ReteModule,
    DialogModule,
    AccordionModule,
    TooltipModule,
    FloatLabelModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    SelectButtonModule,
    InputNumberModule,
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
