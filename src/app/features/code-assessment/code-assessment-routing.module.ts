import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CodeAssessComponent } from "./components/code-assess/code-assess.component";
const routes: Routes = [
  {
    path:"",
    component:CodeAssessComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodeAssessmentRoutingModule {}
