import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../../user.service';
import { TaskService } from './../../services/task.service';
import { Task } from './../../models/Task';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  // attributes
  task: Task;
  errors = [];
  users = [];

  constructor(
  private taskService: TaskService,
  private userService: UserService,
  private router: Router) { }

  // Form groupe edit activity
  taskForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    user: new FormControl('' , Validators.required)
  });

  // getters
  get title() {
    return this.taskForm.get('title');
  }

  get description() {
    return this.taskForm.get('description');
  }

  get duration() {
    return this.taskForm.get('duration');
  }

  get user() {
    return this.taskForm.get('user');
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(res=> {
      console.log(res.result);
      this.users = res.result;
    });
  }

  // Add Task function
  addTask() {
    // init object with data from form
    this.task = {
      title: this.title.value,
      description: this.description.value,
      id_user: this.user.value
    };
    console.log(this.task);

    this.taskService.addTask(this.task).subscribe((result => {
      this.router.navigate(['/main/task']);
    }), addError => this.errors = addError);
  };


}
