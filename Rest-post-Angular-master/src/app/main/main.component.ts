import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    //this.router.navigate(['/profile'],{ replaceUrl: true });
  }

  backToHome(e) {
    this.router.navigate([''], { replaceUrl: true });
  }


  navigateToMyProfile(e) {
    this.router.navigate(['/main/profile']);
  }


  navigateToFacture(e) {
    this.router.navigate(['/main/facture']);
  }

  navigateToAddTeam(e) {
    this.router.navigate(['/main/new-team']);
  }


  navigateToAllTeams(e) {
    this.router.navigate(['/main/team']);
  }

  navigateToAddProjet(e) {
    this.router.navigate(['/main/new-projet']);
  }

  navigateToAllProjects(e) {
    this.router.navigate(['/main/projet']);
  }

  navigateToAddCategory(e) {
    this.router.navigate(['/main/new-category']);
  }

  navigateToAllCategories(e) {
    this.router.navigate(['/main/projet-category']);
  }
  navigateToAddClient(e) {
    this.router.navigate(['/main/new-client']);
  }

  navigateToAllClients(e) {
    this.router.navigate(['/main/clients']);
  }

  GoTODash(e){
    this.router.navigate(['/main/Dashboard']);
  }
}
