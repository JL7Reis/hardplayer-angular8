import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../employee.service';
import { User } from '../../model/user.model';

export interface Genre {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  submitted = false;
  addForm: FormGroup;
  user: User;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService) { }

  genres: Genre[] = [
    {value: null, viewValue: 'Select...'},
    {value: 'MASCULINO', viewValue: 'Masculino'},
    {value: 'FEMININO', viewValue: 'Feminino'},
    {value: 'OUTROS', viewValue: 'Outros'}
  ];

  ngOnInit() {
    this.employeeService.sessionExpired();
    this.addForm = this.formBuilder.group({
      // id: [],
      username: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      bithdate: ['', Validators.required],
      genre: ['', Validators.required],
      birthplace: ['', Validators.required],
      nationality: ['', Validators.required],
      // registration: [''],
      // update: ['']
    });
  }

  onSubmit() {
    this.employeeService.createUser(this.addForm.value)
      .subscribe(data => {
        if (data.status === 200) {
          this.submitted = true;
          this.user = new User();
        } else {
          alert(data.message);
        }
      }
      , error => console.log(error));
  }
}
