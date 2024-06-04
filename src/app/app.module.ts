import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
import { ModelNodeComponent } from './custom-node/model-node.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { CustomConnectionComponent } from './custom-connection/custom-connection.component';

import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { TooltipModule } from 'primeng/tooltip';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

import { GraphPropertiesComponent } from './graph-properties/graph-properties.component';

// Sockets
import { CustomSocketComponent, ModelSocketComponent, ResultSocketComponent} from './custom-socket';
import { DataFrameSocketComponent } from './custom-socket';

import { InputTextModule } from 'primeng/inputtext';
import { FocusHandlerComponent } from './focus-handler/focus-handler.component';

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
    ModelNodeComponent,
    CustomSocketComponent,
    DataFrameSocketComponent,
    ModelSocketComponent,
    ResultSocketComponent,
    CustomConnectionComponent,
    DialogComponent,
    GraphPropertiesComponent,
    FocusHandlerComponent,
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
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
