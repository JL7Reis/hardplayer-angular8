import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  submitted = false;
  addForm: FormGroup;
  user: User;
  minDate = new Date(1940, 0, 1);
  maxDate = new Date();
  genres: string[] = ['Male', 'Female', 'Other', 'Masculino', 'Feminino'];

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      // id: [],
      username: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      birthdate: ['', Validators.required],
      genre: ['', Validators.required],
      birthplace: ['', Validators.required],
      country: ['', Validators.required],
      // registration: [''],
      // update: ['']
    });
  }

  onSubmit() {
    this.userService.createUser(this.addForm.value)
      .subscribe(data => {
        console.log(data);
        this.submitted = true;
      }, error => console.log(error));
  }
}
