import { UserService } from './../../../../user.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Team } from './../../../models/team';
import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../service/team.service';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.css']
})
export class UpdateTeamComponent implements OnInit {

  // attributes
  teamToUpdate: Team;
  newFile: File;
  idTeam: number;
  selectedUser: Number[] = [];
  listUsers: any[] = [];

  constructor(
    private activatedrouter: ActivatedRoute,
    private teamService: TeamService,
    private router: Router,
    private userService: UserService) { }

  // form update
  teamUpdateForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fieldOfActivity: new FormControl('', [Validators.required, Validators.minLength(2)]),
    velocity: new FormControl('', [Validators.required]),
    logo: new FormControl(''),
    checkedUser : new FormArray([], Validators.required)
  });



  ngOnInit() {
    this.teamToUpdate = {
      name: '',
      field_of_activity: '',
      velocity: null,
      logo: '',
    };
    this.activatedrouter.paramMap.subscribe(result => {
      this.idTeam = Number(result.get('id'));
      this.teamService.getTeamById(this.idTeam).subscribe(res => {
        this.teamToUpdate = res;
        console.log(this.teamToUpdate);
       });
    });
    this.loadPage() ;
  }




  // getters
  get name() {
    return this.teamUpdateForm.get('name');
  }
  get fieldOfActivity() {
    return this.teamUpdateForm.get('fieldOfActivity');
  }
  get velocity() {
    return this.teamUpdateForm.get('velocity');
  }

  get logo() {
    return this.teamUpdateForm.get('logo');
  }

  // loadPage
  loadPage () {
    this.loadUsers()
  }

  // load users
  loadUsers () {
    this.userService.getAllUsers().subscribe(result => {
      this.listUsers = result.result;
    }, err => {
      console.log('erreur load users !!');
      console.log(err);
    })
  }

  updateTeam() {
    // if file is null update team else upload file and update photo
    if (this.newFile) {
      // upload then uddate team
        this.uploadPhoto().subscribe(res => {
        console.log('upload photo success !! ');
        console.log(res);
        this.teamToUpdate.logo = res._body;
        this.teamService.updateTeam(this.teamToUpdate).subscribe(res => {
          // update info
          console.log('update team with new photo');
          this.updateInfo();
        });

      });
    } else {
      // update team
      this.teamService.updateTeam(this.teamToUpdate).subscribe(res => {
        console.log('update team no new photo');
        this.updateInfo();
      });
    }
  }

  uploadPhoto (): Observable<any> {
    const photo: FormData = new FormData();
    photo.append('file' , this.newFile, this.newFile.name);
    return this.teamService.uploadPhoto(photo);
  }


  // update info
  updateInfo() {
      // update idTeam in users
      const userToRemovefromTeam = [];
      this.listUsers.forEach(user => {
        if (user.team && (Number(user.team.id) === Number(this.teamToUpdate.id))) {
          userToRemovefromTeam.push(user.id);
        }
      });
      const obj = {
        'idTeam': this.teamToUpdate.id,
        'users' : this.selectedUser,
        'user_to_remove': userToRemovefromTeam
      };
      this.teamService.updateUserTeam(obj).subscribe( res => {
        console.log(res);
        this.router.navigate(['/main/team']);
      } , error => {
        console.log('erreur update user team');
      });
      this.router.navigate(['/main/team']);
  }


  // check box handler
  onCheckboxChange(e) {
    const checkArray: FormArray = this.teamUpdateForm.get('checkedUser') as FormArray;

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

  // handler Input file
  handleFileInput(files: FileList) {
    this.newFile = files.item(0);
    console.log(this.newFile);
  }
}
