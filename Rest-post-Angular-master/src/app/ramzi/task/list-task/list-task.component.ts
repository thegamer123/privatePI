import { UserService } from './../../../user.service';
import { TaskService } from './../../services/task.service';
import { Task } from './../../models/Task';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  // attributes
  listTask: Task [];
  users = [];

  constructor(
    private taskService: TaskService,
    private userService: UserService) { }

  ngOnInit() {
    this.loadPage();
  }

  loadPage() {
    this.loadListTask();
    this.loadUsers();
  }
  // load all Task
  loadListTask() {
      // get all task
      this.taskService.getAllTask().subscribe(data => {
        this.listTask = data;
    });
  }
  // load users
  loadUsers () {
    this.userService.getAllUsers().subscribe(res=> {
      console.log(res.result);
      this.users = res.result;
    });
  }

  // delete task
  deleteTask(id: any) {
    console.log(id);
    this.taskService.deleteTask(id).subscribe(x => {
      this.loadPage();
    });
  }
}
