import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { getBaseURL } from '../utils';


@Component({
  selector: 'app-code-assess',
  templateUrl: './code-assess.component.html',
  styleUrl: './code-assess.component.css',
})
export class CodeAssessComponent {
  uploadedFile: File[] | undefined;
  fetching: boolean = false;
  response: any;
  loadEvent: any;
  constructor(private messageService: MessageService) { }

  onFileLoad(event : any) {
    console.log(event);
    this.loadEvent = event;
    if (event.target.files && event.target.files.length > 0) {
      this.uploadedFile = event.target.files;
    }
  }

  deleteFile(){
    this.uploadedFile = undefined;
    this.response = undefined;
    this.loadEvent.target.value = ''; // reset input so can be reused
  }

  async uploadFile(){

    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Uploading app...' });
    this.fetching = true;
    let formData = new FormData();
    formData.append("photo", this.uploadedFile![0]);
    fetch(getBaseURL("/api/rate_app"), {method: "POST", body: formData}).then(( response ) => {
      this.fetching = false;
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Code assessment performed correctly' });
      response.json().then((data) => {
        this.response = data;
        console.log(this.response);
      })
    }).catch((error) => {
      this.fetching = false;
      this.messageService.add({ severity: 'info', summary: 'Error', detail: 'Error during code assessment' });
    })
  }
}
