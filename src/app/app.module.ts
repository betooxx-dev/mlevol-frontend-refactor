import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

import { FeatureButtonComponent } from './feature-button/feature-button.component';

import { GraphComponent } from './graph/graph.component';
import { GraphMenuComponent } from './graph-menu/graph-menu.component';
import { GraphEditorComponent } from './graph-editor/graph-editor.component';
import { GraphLayersComponent } from './graph-layers/graph-layers.component';
import { GraphSettingsComponent } from './graph-settings/graph-settings.component';

import { ReteModule } from 'rete-angular-plugin/17';

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
    GraphSettingsComponent,
    FeatureButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    ReteModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
