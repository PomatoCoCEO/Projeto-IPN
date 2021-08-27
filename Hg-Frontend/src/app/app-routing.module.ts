import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ProjectDetailsComponent } from './pages/projects/project-details/project-details.component';
import { ProjectGeneralComponent } from './pages/projects/project-general/project-general.component';
import { ProjectNewComponent } from './pages/projects/project-new/project-new.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TaskGeneralComponent } from './pages/tasks/task-general/task-general.component';
import { EditUserComponent } from './pages/user/edit-user/edit-user.component';
import { UserDetails } from './pages/user/user-details/user-details.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AuthActivator } from './services/authActivator/auth-activator.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthActivator] },
  {
    path: 'tasks',
    component: TaskGeneralComponent,
    canActivate: [AuthActivator],
  },
  {
    path: 'projects',
    component: ProjectGeneralComponent,
    canActivate: [AuthActivator],
  },
  {
    path: 'project/new',
    component: ProjectNewComponent,
    canActivate: [AuthActivator],
  },
  {
    path: 'project/:id',
    component: ProjectDetailsComponent,
    canActivate: [AuthActivator],
  },
  {
    path: 'user/edit',
    component: EditUserComponent,
    canActivate: [AuthActivator],
  },
  {
    path: 'user/:username',
    component: UserDetails,
    canActivate: [AuthActivator],
  },
  { path: 'welcome', component: WelcomeComponent },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
