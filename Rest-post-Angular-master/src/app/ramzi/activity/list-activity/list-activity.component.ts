import { ActivityService } from './../../services/activity.service';
import { Activity } from './../../models/Activity';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-activity',
  templateUrl: './list-activity.component.html',
  styleUrls: ['./list-activity.component.css']
})
export class ListActivityComponent implements OnInit {

  // attributes
  listActivity: Activity [];


  constructor(private activityService: ActivityService) { }

  ngOnInit() {
    this.loadPage();
  }

  // load page
  loadPage() {
    this.loadListActivity();
  }

  // load list
  loadListActivity() {
      // get all activity
      this.activityService.getAllActivity().subscribe(data => {
        this.listActivity = data;
    });
  }

  // delete activity
  deleteActivity(id: any) {
    console.log(id);
    this.activityService.deleteActivity(id).subscribe(x => {
      this.loadPage();
    });
  }

}
