import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'patron-rnf';
  constructor(private router: Router) {

  }
  home() {
    this.router.navigateByUrl('')
  }
}
