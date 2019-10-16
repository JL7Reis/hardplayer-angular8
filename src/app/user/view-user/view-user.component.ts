import { User } from '../../model/user.model';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  cpf: string;
  user: User;

  constructor(private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.sessionExpired();
    this.user = new User();

    this.cpf = this.route.snapshot.params[`cpf`];
    this.employeeService.getUserById(this.cpf)
      .subscribe(data => {
        console.log(data.result);
        this.user = data.result;
      }, error => console.log(error));
  }

  list() {
    this.router.navigate(['listuser']);
  }
}
