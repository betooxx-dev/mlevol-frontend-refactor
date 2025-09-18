import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GraphComponent } from "./components/graph/graph.component";
const routes: Routes = [
  {
    path:"",
    component:GraphComponent,
    runGuardsAndResolvers:"always"
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraphEditorRoutingModule {}
