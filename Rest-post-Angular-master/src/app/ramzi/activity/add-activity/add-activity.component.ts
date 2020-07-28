import { UserService } from './../../../user.service';
import { Activity } from './../../models/Activity';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivityService } from './../../services/activity.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  // attributes
  activity: Activity;
  errors = [];
  users = [];

  constructor(
    private activityService: ActivityService,
    private userService : UserService,
    private router: Router) {
  }
  // Form groupe edit activity
  activityForm: FormGroup = new FormGroup({
    status: new FormControl('', [Validators.required, Validators.minLength(3)]),
    date: new FormControl('', [Validators.required]),
    user: new FormControl('' , Validators.required)
  });

  // getters
  get status() {
    return this.activityForm.get('status');
  }

  get date() {
    return this.activityForm.get('date');
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(res=> {
      console.log(res.result);
      this.users = res.result;
    });
  }

  // Add Category project function
  addActivity() {
    // init object with data from form
    this.activity = {
      status: this.status.value,
      date: this.date.value,
    };
    this.activityService.addActivity(this.activity).subscribe((result => {
      this.router.navigate(['/main/activity']);
    }), addError => this.errors = addError);
  };
}
