import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/*import { ChartsModule } from 'mdbootstrap';*/
//import { ChartsModule } from 'angular-bootstrap-md';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { DeletePostComponent } from './delete-post/delete-post.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { PostService } from './post.service';
import { AuthGuard } from './auth.guard';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
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
import { ProjetService } from './marwa/projet/projet.service';
import { GetProjectComponent } from './marwa/projet/get-project/get-project.component';
import { EditProjectComponent } from './marwa/projet/edit-project/edit-project.component';
import { AddProjectComponent } from './marwa/projet/add-project/add-project.component';
import { ClientService } from './marwa/client/client.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddProjectCategoryComponent } from './wael/components/project-category/add-project-category/add-project-category.component';
import { ListProjectCategoryComponent } from './wael/components/project-category/list-project-category/list-project-category.component';
import { UpdateProjectCategoryComponent } from './wael/components/project-category/update-project-category/update-project-category.component';
import { CategoryProjectService } from './wael/service/category-project.service';
import { AddClientComponent } from './marwa/client/add-client/add-client.component';
import { EditClientComponent } from './marwa/client/edit-client/edit-client.component';
import { GetClientComponent } from './marwa/client/get-client/get-client.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { FactureService } from './facture.service';
import { ListFactureComponent } from './list-facture/list-facture.component';
import { AddActivityComponent } from './ramzi/activity/add-activity/add-activity.component';
import { EditActivityComponent } from './ramzi/activity/edit-activity/edit-activity.component';
import { ListActivityComponent } from './ramzi/activity/list-activity/list-activity.component';
import { AddTaskComponent } from './ramzi/task/add-task/add-task.component';
import { EditTaskComponent } from './ramzi/task/edit-task/edit-task.component';
import { ListTaskComponent } from './ramzi/task/list-task/list-task.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'posts', component: PostComponent, canActivate: [AuthGuard] },
  { path: 'add-post', component: AddPostComponent, canActivate: [AuthGuard] },
  { path: 'edit-post/:id', component: EditPostComponent, canActivate: [AuthGuard] },
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard], children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'facture', component: FactureComponent },
      { path: 'team', component: ListTeamComponent },
      { path: 'team/:id', component: UpdateTeamComponent },
      { path: 'new-team', component: AddTeamComponent },
      { path: 'projet', component: GetProjectComponent },
      { path: 'projet/:id', component: EditProjectComponent },
      { path: 'new-projet', component: AddProjectComponent },
      { path: 'projet-category', component: ListProjectCategoryComponent },
      { path: 'category-project/:id', component: UpdateProjectCategoryComponent },
      { path: 'new-category', component: AddProjectCategoryComponent },
      { path: 'clients', component: GetClientComponent },
      { path: 'client/:id', component: EditClientComponent },
      { path: 'new-client', component: AddClientComponent },
      { path: 'Dashboard', component: PieChartComponent },
      { path: 'allFacture', component: ListFactureComponent },
      { path: 'activity', component: ListActivityComponent },
      { path: 'activity/:id', component: EditActivityComponent },
      { path: 'new-activity', component: AddActivityComponent },
      { path: 'task', component: ListTaskComponent },
      { path: 'task/:id', component: EditTaskComponent },
      { path: 'new-task', component: AddTaskComponent }

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
    GetProjectComponent,
    EditProjectComponent,
    AddProjectComponent,
    ListProjectCategoryComponent,
    UpdateProjectCategoryComponent,
    AddProjectCategoryComponent,
    GetClientComponent,
    EditClientComponent,
    AddClientComponent,
    PieChartComponent,
    ListFactureComponent,
    AddActivityComponent,
    EditActivityComponent,
    ListActivityComponent,
    AddTaskComponent,
    EditTaskComponent,
    ListTaskComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule],
  providers: [AuthService, PostService, AuthGuard,
    UserService,
    TeamService,
    ProjetService,
    ClientService,
    HttpClient,
    FactureService,
    CategoryProjectService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
