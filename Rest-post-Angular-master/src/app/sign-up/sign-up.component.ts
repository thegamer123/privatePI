import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  errors = [];


  addUser(e) {

    if (this.password != this.password_confirmation) {
      alert("Password and confirm password does not match")
    } else {

      let user: any;
      user = {
        username: this.username,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      };
      this._userService.addUser(user).subscribe((result => {

        this.router.navigate(['/login'], { replaceUrl: true });

      }), addError => this.errors = addError);
    }
  }

  navigateToLogin(e) {
    this.router.navigate(['/login']);
  }


}
