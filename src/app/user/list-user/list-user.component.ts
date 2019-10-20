import { EmployeeService } from '../../employee.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  hide: true;
  users: User[];

  constructor(private router: Router, private employeeService: EmployeeService ) { }

  ngOnInit() {
    if (this.employeeService.sessionExpired()) {
      return;
    }
    this.employeeService.getUsers()
    .subscribe( data => {
      console.log(data);
      this.users = data.result;
    });
  }

  deleteUser(user: User): void {
    this.employeeService.deleteUser(user.cpf)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      });
  }

  editUser(user: User): void {
    localStorage.removeItem('editUserCpf');
    localStorage.setItem('editUserCpf', user.cpf);
    this.router.navigate(['home/edituser', user]);
  }

  viewUser(id: number) {
    this.router.navigate(['home/viewuser', id]);
  }
}
