import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../user.service';
import { TaskService } from './../../services/task.service';
import { Task } from './../../models/Task';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  // attributes
  task: Task;
  idTask: number;
  users = [];

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private activatedrouter: ActivatedRoute,
    private router: Router
  ) { }

  // Form groupe edit activity
  taskForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    user: new FormControl('' , Validators.required)
  });


  ngOnInit() {

    this.task = { title: '', description : '' , duration: 0};
    this.activatedrouter.paramMap.subscribe(result => {
      this.idTask = Number(result.get('id'));
      this.taskService.getTaskById(this.idTask).subscribe(res => { this.task = res; });
    });
    this.userService.getAllUsers().subscribe(res => {
      console.log(res.result);
      this.users = res.result;
    });
  }

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


  // update task
  // update activity
  updateActivity() {
    console.log(this.task.userId);
    this.task.userId = this.user.value;
    console.log('**********************');
    console.log(this.task);
    this.taskService.updateTask(this.task).subscribe(data => {
      this.router.navigate(['/main/task']);
    }, error => {
      console.log(error);
    });
  }


}
