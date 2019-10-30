import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../../model/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {

  cpf: string;
  user: User;
  editForm: FormGroup;
  minDate = new Date(1940, 0, 1);
  maxDate = new Date();
  genres: string[] = ['Male', 'Female', 'Other', 'Masculino', 'Feminino'];

  constructor(
    private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private userService: UserService ) { }

  ngOnInit() {
    console.log('minDate ' + this.minDate);
    console.log('maxDate ' + this.maxDate);
    const userCpf = localStorage.getItem('editUserCpf');
    if (!userCpf) {
      alert('Invalid action.');
      this.router.navigate(['home/listuser']);
      return;
    }
    this.editForm = this.formBuilder.group({
      _id: [''],
      username: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      birthdate: [''],
      genre: ['', Validators.required],
      birthplace: ['', Validators.required],
      country: ['', Validators.required],
      registration: [''],
      update: ['']
    });
    console.log(this.route.snapshot.params[`user`]);
    this.cpf = this.route.snapshot.params[`cpf`];
    this.userService.getUserById(this.cpf)
      .subscribe(data => {
        console.log(data);
        this.editForm.setValue(data.result);
      });
  }

  ngOnDestroy(): void {
    localStorage.removeItem('editUserCpf');
  }

  onSubmit() {
    this.userService.updateUser(this.editForm.value)
      .subscribe(data => {
        console.log(data);
        alert('User updated successfully.');
        this.router.navigate(['home/listuser']);
      }, error => console.log(error));
  }
}
