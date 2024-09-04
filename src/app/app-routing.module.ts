import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { GraphComponent } from './graph/graph.component';
import { CodeAssessComponent } from './code-assess/code-assess.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', runGuardsAndResolvers: 'always', },
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'pipeline_generator', component: GraphComponent, runGuardsAndResolvers: 'always',},
  { path: 'assess', component: CodeAssessComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
    
    ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
