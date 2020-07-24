import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToLogin(e) {
    this.router.navigate(['/login']);
  }

  navigateToRegister(e) {
    this.router.navigate(['/register']);
  }


}
