import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "@features/home/components/about/about.component";
import { HomeComponent } from "@features/home/components/home/home.component";


const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
    runGuardsAndResolvers: "always",
  },
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  {
    path: "pipeline_generator",
    loadChildren:()=>import('./features/graph-editor/graph-editor.module').then(m=>m.GraphEditorModule)
  },
  { path: "assess", 
    loadChildren:()=>import('./features/code-assessment/code-assessment.module').then(m=>m.CodeAssessmentModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
