import { ActivatedRoute } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';
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


  constructor(
    private activatedrouter: ActivatedRoute,
    private teamService: TeamService) { }

  // form update
  teamUpdateForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fieldOfActivity: new FormControl('', [Validators.required, Validators.minLength(2)]),
    velocity: new FormControl('', [Validators.required]),
    logo: new FormControl('')
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
      this.teamService.getTeamById(this.idTeam).subscribe(res => {this.teamToUpdate = res;console.log(this.teamToUpdate);
       });
    });


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



  updateTeam() {
    console.log('update');
  }

  // handler Input file
  handleFileInput(files: FileList) {

    this.newFile = files.item(0);
    console.log(this.newFile);

  }
}
