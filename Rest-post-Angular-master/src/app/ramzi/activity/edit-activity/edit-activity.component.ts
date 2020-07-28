import { UserService } from './../../../user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from './../../services/activity.service';
import { Activity } from './../../models/Activity';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {

  // attributes
  activity: Activity;
  idActivity: number;
  users = [];


  constructor(
    private activityService: ActivityService,
    private userService: UserService,
    private activatedrouter: ActivatedRoute,
    private router: Router
  ) { }


  // Form groupe edit activity
  activityForm: FormGroup = new FormGroup({
    status: new FormControl('', [Validators.required, Validators.minLength(3)]),
    date: new FormControl('', [Validators.required]),
    user: new FormControl('')
  });

  ngOnInit() {
    this.activity = { status: '', date: '' };
    this.activatedrouter.paramMap.subscribe(result => {
      this.idActivity = Number(result.get('id'));
      this.activityService.getActivityById(this.idActivity).subscribe(res => { this.activity = res; });
    });
    this.userService.getAllUsers().subscribe(res=> {
      console.log(res.result);
      this.users = res.result;
    });

  }

  // getters
  get status() {
    return this.activityForm.get('status');
  }

  get date() {
    return this.activityForm.get('date');
  }

  // update activity
  updateActivity() {
    this.activityService.updateActivity(this.activity).subscribe(data => {
      this.router.navigate(['/main/activity']);
    }, error => {
      console.log(error);
    });
  }

}
