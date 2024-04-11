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
import { DialogComponent, GraphEditorComponent } from './graph-editor/graph-editor.component';
import { GraphLayersComponent } from './graph-layers/graph-layers.component';
import { GraphSettingsComponent } from './graph-settings/graph-settings.component';

import { ReteModule } from 'rete-angular-plugin/17';
import { CustomNodeComponent } from './custom-node/custom-node.component';

import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CustomSocketComponent } from './custom-socket/custom-socket.component';
import { CustomConnectionComponent } from './custom-connection/custom-connection.component';

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
    CustomNodeComponent,
    CustomSocketComponent,
    CustomConnectionComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    ReteModule,
    MatButtonModule,
    MatDialogModule,

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
