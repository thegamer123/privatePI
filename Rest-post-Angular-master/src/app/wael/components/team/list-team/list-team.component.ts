import { UserService } from './../../../../user.service';
import { User } from './../../../../User';

import { Team } from './../../../models/team';
import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../service/team.service';

@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.css']
})
export class ListTeamComponent implements OnInit {

  // attributes
  listTeams: Team[];
  users: any[] = [];

  constructor(
    private teamService: TeamService,
    private userService: UserService) { }

  ngOnInit() {
    this.loadPage();
  }

  loadPage (): void {
    this.loadListTeam ();
    this.loadUsers();
  }

  // load list team
  loadListTeam (): void {
    this.teamService.getAllTeam().subscribe((res) => {
      console.log(res);
      this.listTeams = res;
    });
  }

  // load list users
  loadUsers () {
    this.userService.getAllUsers().subscribe(res => {
      this.users = res.result;
      console.log(this.users);
     });
  }

  // Delete Team
  deleteTeam(idTeam: number): void {
    console.log('delete');
    this.teamService.deleteTeam(idTeam).subscribe(res => {
      console.log(res);
      console.log('Team Deleted !');
      this.loadListTeam();
    } , error => {
      console.log(error);
      console.log('Erreur delete!');
    });
  }
}
