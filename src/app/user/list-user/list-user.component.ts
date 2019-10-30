import { UserService } from '../user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  displayedColumns: string[] = ['username', 'cpf', 'email', 'birthdate', 'country', 'actions'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  hide: true;
  users: User[];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(data => {
        console.log(data);
        this.users = data.result;
        this.loadTable(this.users);
      }, error => console.log(error));
  }

  viewUser(id: number) {
    this.router.navigate(['home/viewuser', id]);
  }

  editUser(user: User): void {
    localStorage.removeItem('editUserCpf');
    localStorage.setItem('editUserCpf', user.cpf);
    this.router.navigate(['home/edituser', user]);
  }

  deleteUser(user: User): void {
    if (window.confirm('Are sure you want to delete this user?')) {
      this.userService.deleteUser(user.cpf)
        .subscribe(data => {
          console.log(data);
          this.users = this.users.filter(u => u !== user);
      }, error => console.log(error));
    }
  }

  loadTable(users: User[]) {
    this.dataSource = new MatTableDataSource(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
