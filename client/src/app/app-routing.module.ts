import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BoardAdminComponent } from './user/board-admin/board-admin.component';
import { BoardModeratorComponent } from './user/board-moderator/board-moderator.component';
import { BoardUserComponent } from './user/board-user/board-user.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/tutorials', pathMatch:'full' },
  { path:"home", component:HomeComponent},
  { path:'tutorials', component:TutorialsListComponent},
  { path: "tutorials/:id", component: TutorialDetailsComponent},
  { path:"add", component:AddTutorialComponent},
  { path:"header", component:HeaderComponent},

  { path:"board-admin", component:BoardAdminComponent},
  { path:"board-moderator", component:BoardModeratorComponent},
  { path:"board-user", component:BoardUserComponent},
  { path:"login", component:LoginComponent},
  { path:"profile", component:ProfileComponent},
  { path:"register", component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
