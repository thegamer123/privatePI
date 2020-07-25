
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

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.loadPage();
  }

  loadPage (): void {
    this.loadListTeam ();
  }

  loadListTeam (): void {
    this.teamService.getAllTeam().subscribe((res) => {
      console.log(res);
      this.listTeams = res;
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
