import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { User } from './model/user.model';

const routes: Routes = [
  { path: '', component: ListUserComponent},
  { path: 'login', component: LoginComponent },
  { path: 'adduser', component: AddUserComponent },
  { path: 'edituser', component: EditUserComponent, data: { user: User } },
  { path: 'viewuser', component: ViewUserComponent },
  { path: 'listuser', component: ListUserComponent },
  { path: 'exit', component: ListUserComponent }, 
  { path: 'source', redirectTo: `window.location.href = https://github.com/JL7Reis/softplayer/archive/master.zip` }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
