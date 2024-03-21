import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { GraphComponent } from './graph/graph.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'graph', component: GraphComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    
    ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
