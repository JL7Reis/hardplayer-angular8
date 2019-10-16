import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../../model/user.model';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  cpf: string;
  user: User;
  editForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService ) { }

  ngOnInit() {
    this.employeeService.sessionExpired();
    const userId = window.localStorage.getItem('editUserId');
    if (!userId) {
      alert('Invalid action.');
      this.router.navigate(['listuser']);
      return;
    }
    this.editForm = this.formBuilder.group({
      _id: [''],
      username: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      bithdate: ['', Validators.required],
      genre: ['', Validators.required],
      birthplace: ['', Validators.required],
      nationality: ['', Validators.required],
      registration: [''],
      update: ['']

    });
    this.cpf = this.route.snapshot.params[`cpf`];
    console.log(this.editForm.value);
    this.employeeService.getUserById(this.cpf)
      .subscribe( data => {
        this.editForm.setValue(data.result);
      });
  }

  updateEmployee() {
    this.employeeService.updateUser(this.user)
      .subscribe(data => {
        console.log(data.result);
      }, error => console.log(error));
    this.user = new User();
    this.gotoList();
  }

  onSubmit() {
    this.employeeService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.status === 200) {
            alert('User updated successfully.');
            this.router.navigate(['listuser']);
          } else {
            alert(data.message);
          }
        },
        error => alert(error)
      );
  }

  gotoList() {
    this.router.navigate(['listuser']);
  }
}
