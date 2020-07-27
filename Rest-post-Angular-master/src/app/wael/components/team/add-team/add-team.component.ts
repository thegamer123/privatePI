import { Router } from '@angular/router';
import { UserService } from './../../../../user.service';
import { Observable, Subscribable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Team } from './../../../models/team';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TeamService } from '../../../service/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {


  // attributes
  team: Team;
  fileToupload: File = null;
  listUsers = [];
  selectedUser: Number[] = [];


  constructor(
    private teamService: TeamService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  // form groupe add Team
  teamForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fieldOfActivity: new FormControl('', [Validators.required, Validators.minLength(2)]),
    velocity: new FormControl('', [Validators.required]),
    logo: new FormControl('',  [Validators.required]),
    checkedUser : new FormArray([], Validators.required)
  });

  ngOnInit() {
    this.userService.getAllUsers().subscribe(res=> {
      console.log(res.result);
      this.listUsers = res.result;
    });
  }

  // getters
  get name() {
    return this.teamForm.get('name');
  }
  get fieldOfActivity() {
    return this.teamForm.get('fieldOfActivity');
  }
  get velocity() {
    return this.teamForm.get('velocity');
  }

  get logo() {
    return this.teamForm.get('logo');
  }

  // add Team
  addTeam() {
    // upload photo and get the path
    this.uploadPhoto().subscribe(res => {
      const path_logo = res._body;
      // create team object
      this.team = {
        name: this.name.value,
        field_of_activity: this.fieldOfActivity.value,
        velocity: this.velocity.value,
        logo: path_logo
      };
      // save team to database
      this.teamService.addTeam(this.team).subscribe(response => {
        console.log('team added');
        const idTeam = response._body;
        if (Number(idTeam)) {
          const obj = {
            'idTeam' : idTeam,
            'users' : this.selectedUser,
            'user_to_remove': []
          }
          // for each user we should add the id Team
          this.teamService.updateUserTeam(obj).subscribe( res => {
            console.log(res);
            this.router.navigate(['/main/team']);
          } , error => {
            console.log('erreur update user team');
          });
        }
      }, error => {
        console.log(error);
    });
    }, erreur_upload => {
      console.log(erreur_upload);
      console.log('Erreur upload photo');
    });
  }

  uploadPhoto (): Observable<any> {
    const photo: FormData = new FormData();
    photo.append('file' , this.fileToupload, this.fileToupload.name);
    return this.teamService.uploadPhoto(photo);
  }

  // handler Input file
  handleFileInput(files: FileList) {
    this.fileToupload = files.item(0);
  }

  // check box handler
  onCheckboxChange(e) {
    const checkArray: FormArray = this.teamForm.get('checkedUser') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
      this.selectedUser = checkArray.value;
      console.log(this.selectedUser);
    } else {
      let i = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          this.selectedUser = checkArray.value;
          console.log(this.selectedUser);
          return;
        }
        i++;
      });
    }
  }
}
