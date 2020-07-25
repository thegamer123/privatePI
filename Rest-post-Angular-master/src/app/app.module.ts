import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { DeletePostComponent } from './delete-post/delete-post.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { PostService } from './post.service';
import { AuthGuard } from './auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserService } from './user.service';
import { ProfileComponent } from './profile/profile.component';
import { FactureComponent } from './facture/facture.component';
import { FactureRowComponent } from './facture-row/facture-row.component';
import { ListTeamComponent } from './wael/components/team/list-team/list-team.component';
import { UpdateTeamComponent } from './wael/components/team/update-team/update-team.component';
import { AddTeamComponent } from './wael/components/team/add-team/add-team.component';
import { TeamService } from './wael/service/team.service';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'posts', component: PostComponent, canActivate: [AuthGuard] },
  { path: 'add-post', component: AddPostComponent, canActivate: [AuthGuard] },
  { path: 'edit-post/:id', component: EditPostComponent, canActivate: [AuthGuard] },
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard], children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'facture', component: FactureComponent },
      { path: 'team', component: ListTeamComponent },
      { path: 'team/:id', component: UpdateTeamComponent },
      { path: 'new-team', component: AddTeamComponent }
    ]
  },
];


@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    AddPostComponent,
    EditPostComponent,
    DeletePostComponent,
    LoginComponent,
    HomeComponent,
    MainComponent,
    SignUpComponent,
    ProfileComponent,
    FactureComponent,
    FactureRowComponent,
    ListTeamComponent,
    UpdateTeamComponent,
    AddTeamComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, PostService, AuthGuard, UserService, TeamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
