import { Component, OnInit } from '@angular/core';
import { GraphEditorService } from '../../graph-editor.service';
import {  DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-template-dialog',
  templateUrl: './template-dialog.component.html',
  styleUrl: './template-dialog.component.css',
})
export class TemplateDialogComponent implements OnInit{
  availableTemplates : any[] = [];

  constructor(public graphEditorService : GraphEditorService, private ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.availableTemplates = this.graphEditorService.getAvailableTemplates();
  }

  close(path: string) {
    this.ref.close(path);
  }

  cancel() {
    this.ref.close();
  }
}
