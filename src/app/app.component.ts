import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hardplayer - CRUD with Angular 8 + Spring Boot 2 + JWT';

  constructor(private router: Router, private employeeService: EmployeeService) { }

  onExit() {
    this.employeeService.exit();
    this.router.navigate(['login']);
  }
}
