import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-small-header',
  templateUrl: './small-header.component.html',
  styleUrl: './small-header.component.css'
})
export class SmallHeaderComponent {

  @Input() custom_header!: string;

  constructor(private router: Router) { }
  
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
      this.reloadPage();
      this.router.navigate([uri])});

    }
  reloadPage(){
    window.location.reload();
  }
}
