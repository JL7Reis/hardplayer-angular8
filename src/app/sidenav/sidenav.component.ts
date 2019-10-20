import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private employeeService: EmployeeService) {}
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  ngOnInit() {
    this.employeeService.sessionExpired();
  }
}
