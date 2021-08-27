import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpService } from './services/httpService/http.service';
import { NavbarHgComponent } from './navbar-hg/navbar-hg.component';
import { TaskGeneralComponent } from './pages/tasks/task-general/task-general.component';
import { TaskDetailsComponent } from './pages/tasks/task-details/task-details.component';
import { ProjectGeneralComponent } from './pages/projects/project-general/project-general.component';
import { ProjectDetailsComponent } from './pages/projects/project-details/project-details.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { CommonModule } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { UserDetails } from './pages/user/user-details/user-details.component';
import { TaskStateComponent } from './pages/tasks/task-state/task-state.component';
import { ProjectNewComponent } from './pages/projects/project-new/project-new.component';
import { TaskListComponent } from './pages/tasks/task-list/task-list.component';
import { EditTaskComponent } from './pages/tasks/edit-task/edit-task.component';
import { DateInputComponent } from './shared/components/date-input/date-input.component';
import { BackButtonComponent } from './shared/components/back-button/back-button.component';
import { NoTasksColouredComponent } from './shared/components/no-tasks-coloured/no-tasks-coloured.component';
import { EditUserComponent } from './pages/user/edit-user/edit-user.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarHgComponent,
    TaskGeneralComponent,
    TaskDetailsComponent,
    ProjectGeneralComponent,
    ProjectDetailsComponent,
    LogoutComponent,
    UserDetails,
    TaskStateComponent,
    ProjectNewComponent,
    TaskListComponent,
    EditTaskComponent,
    DateInputComponent,
    BackButtonComponent,
    NoTasksColouredComponent,
    EditUserComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
