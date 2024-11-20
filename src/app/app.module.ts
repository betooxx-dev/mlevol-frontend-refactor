import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SmallHeaderComponent } from './small-header/small-header.component';

import { FeatureButtonComponent } from './feature-button/feature-button.component';

import { GraphComponent } from './graph/graph.component';
import { GraphMenuComponent } from './graph-menu/graph-menu.component';
import { GraphEditorComponent } from './graph-editor/graph-editor.component';
import { GraphLayersComponent } from './graph-layers/graph-layers.component';
import { GraphPropertiesComponent } from './graph-properties/graph-properties.component';

import { CodeAssessComponent } from './code-assess/code-assess.component';

import { ReteModule } from 'rete-angular-plugin/17';

import { CustomNodeComponent } from './custom-node/custom-node.component';
import { ModelNodeComponent } from './custom-node/model-node.component';

import { CustomConnectionComponent } from './custom-connection/custom-connection.component';

import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { TooltipModule } from 'primeng/tooltip';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { KnobModule } from 'primeng/knob';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

// Sockets
import { CustomSocketComponent,} from './custom-socket';


import { FocusHandlerComponent } from './focus-handler/focus-handler.component';
import { MessageService } from 'primeng/api';
import { CodeAssessFetchingComponent } from './code-assess-fetching/code-assess-fetching.component';
import { CodeAssessResponseComponent } from './code-assess-response/code-assess-response.component';
import { GraphFileComponent } from './graph-file/graph-file.component';
import { TemplateDialogComponent } from './graph-file/template-dialog/template-dialog.component';


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
    DynamicDialogModule
  ],
  providers: [
    provideAnimationsAsync(),
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
