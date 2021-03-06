import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _userService: UserService, private router: Router, private route: ActivatedRoute) { }
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  errors = [];

  ngOnInit() {
    //this.getUserByUsername(this.route.snapshot.params['username'])
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getUserByUsername(currentUser.username)
  }

  getUserByUsername(username) {

    console.log(username)
    this._userService.getUserByUserName(username).subscribe((result => {

      let json = JSON.parse(JSON.stringify(result))
      let user = json.result[0]
      this.username = user.username;
      this.email = user.email;
      this.password = "";
      this.password_confirmation = "";

    }), addError => this.errors = addError);

  }

}
