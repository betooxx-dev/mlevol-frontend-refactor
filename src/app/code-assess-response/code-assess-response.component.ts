import { Component, Input } from '@angular/core';
import saveAs from 'file-saver';

@Component({
  selector: 'app-code-assess-response',
  templateUrl: './code-assess-response.component.html',
  styleUrl: './code-assess-response.component.css'
})
export class CodeAssessResponseComponent {
  @Input() response!: any[];

  constructor() {

  }

  getFullReport() {
    let text = this.response[0].full_report.slice(2,-1);
    text = this.cleanText(text);
    const blob = new Blob([text], { type: 'text/plain' });
    window.saveAs(blob, 'report.txt');
  }

  cleanText(text : string) {
    text.replace(/\n/g, "\n");
    text.replace(/\t/g, "\t");
    text.replace(/\r/g, "\r");
    text.replace(/\\/g, "");

    return text;
  }
}
