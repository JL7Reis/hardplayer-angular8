import { User } from '../../model/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  cpf: string;
  user: User;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.cpf = this.route.snapshot.params[`cpf`];
    this.userService.getUserById(this.cpf)
      .subscribe(data => {
        console.log(data.result);
        this.user = data.result;
      }, error => console.log(error));
  }

  list() {
    this.router.navigate(['home/listuser']);
  }
}
