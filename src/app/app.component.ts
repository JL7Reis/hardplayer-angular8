import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hardplayer';

  constructor(private router: Router, private appService: AppService) { }

  logout() {
    this.router.navigate(['login']);
    this.appService.exit();
  }
}
