import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AppService } from '../app.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  hide = true;
  loginForm: FormGroup;
  invalidLogin = false;

  constructor(private formBuilder: FormBuilder, private router: Router,  private appService: AppService ) { }

  ngOnInit() {
    localStorage.clear();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginPayload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    };
    this.appService.login(loginPayload).subscribe(data => {
      if (data.status === 200) {
        localStorage.setItem('token', data.result);
        this.router.navigate(['home']);
      } else {
        this.invalidLogin = true;
        console.log(data);
      }
    });
  }
}
