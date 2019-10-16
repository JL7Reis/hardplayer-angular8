import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EmployeeService } from './employee.service';
import { TokenInterceptor } from './core/interceptor';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { JwtModule } from '@auth0/angular-jwt';

const appRoutes: Routes = [
  { path: '', component: ListUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'exit', component: LoginComponent },
  { path: 'listuser', component: ListUserComponent },
  { path: 'source', redirectTo: `window.location.href = https://github.com/JL7Reis/softplayer/archive/master.zip` }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    ViewUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debug
    ),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
        return localStorage.getItem('token');
        }
     },
   })
  ],
  providers: [EmployeeService, {provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
