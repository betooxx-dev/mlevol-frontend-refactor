import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CodeAssessmentRoutingModule } from "./code-assessment-routing.module";
import { CodeAssessComponent } from "./components/code-assess/code-assess.component";
import { CodeAssessFetchingComponent } from "./components/code-assess-fetching/code-assess-fetching.component";
import { CodeAssessResponseComponent } from "./components/code-assess-response/code-assess-response.component";
import { KnobModule } from "primeng/knob";
import { TableModule } from "primeng/table";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { SharedModule } from "@app/shared/shared.module";
@NgModule({
  declarations: [
    CodeAssessComponent,         
    CodeAssessFetchingComponent, 
    CodeAssessResponseComponent, 
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ButtonModule,
    KnobModule,
    TableModule,
    CodeAssessmentRoutingModule
  ],
})
export class CodeAssessmentModule {}
