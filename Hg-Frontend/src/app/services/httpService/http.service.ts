import {
  HttpClient,
  HttpHeaders,
  JsonpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginViewModel, LoginResult } from 'src/app/shared/login';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SignUpViewModel } from 'src/app/shared/signup';
import { TaskViewModel } from 'src/app/shared/tasks';
import { ProjectViewModel } from 'src/app/shared/projects';
import { ProgrammerStats } from 'src/app/shared/programmer';
import { ManagerStats } from 'src/app/shared/manager';
import { UserStats } from 'src/app/shared/user';
import { UserDetails } from 'src/app/pages/user/user-details/user-details.component';
import { UserEditModel } from 'src/app/pages/user/edit-user/edit-user.component';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public token: string = '';
  public expiration = new Date();
  public userDetails = new SignUpViewModel();
  public projectDetails = new ProjectViewModel();
  public tasks: TaskViewModel[] = [];
  public projects: ProjectViewModel[] = [];
  public userSearchDetails = new UserStats();
  public programmers: string[] = [];
  constructor(private http: HttpClient) {}

  get loginRequired(): boolean {
    return this.token.length === 0 || this.expiration < new Date();
  }

  login(creds: LoginViewModel) {
    return this.http.post<LoginResult>('/api/account/createToken', creds).pipe(
      map((data) => {
        this.token = new String(data.token).toString();
        this.expiration = new Date(data.expiration);
        this.userDetails = new SignUpViewModel(data.userDetails); // será necessário ou recomendável outro endpoint?
      })
    );
  }

  logout() {
    return this.http.get('/api/account/logout', {
      responseType: 'text',
    });
  }

  signup(signup: SignUpViewModel) {
    return this.http.post('/api/account/signUp', signup, {
      responseType: 'text',
    });
  }

  postPhoto(photo: FormData, username: string) {
    return this.http.post('/api/account/savePhoto/' + username, photo, {
      responseType: 'text',
    });
  }

  getTasks() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    // let ans: TaskViewModel[] = [];
    return this.http
      .get<TaskViewModel[]>('/api/task/tasks', {
        headers: headers,
      })
      .pipe(
        map((data) => {
          this.tasks = data;
          for (let i = 0; i < this.tasks.length; i++) {
            this.tasks[i] = new TaskViewModel(this.tasks[i]);
          }
        })
      );
  }

  setTaskFinished(task_id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    // put method with no body
    return this.http.put<string>('/api/task/tasks/' + task_id, null, {
      headers: headers,
      // responseType: 'number',
    });
  }

  getProjects() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .get<ProjectViewModel[]>('/api/project/', { headers: headers })
      .pipe(
        map((data) => {
          this.projects = data;
          for (let i = 0; i < this.projects.length; i++) {
            this.projects[i] = new ProjectViewModel(this.projects[i]);
          }
        })
      );
  }

  getProject(id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .get<ProjectViewModel>('/api/project/projects/' + id, {
        headers: headers,
      })
      .pipe(
        map((data) => {
          this.projectDetails = data;
          this.projectDetails = new ProjectViewModel(this.projectDetails);
        })
      );
  }

  getUserDetails(username: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .get<UserStats>('/api/user/' + username, {
        headers: headers,
      })
      .pipe(
        map((data) => {
          this.userSearchDetails = new UserStats(data);
        })
      );
  }

  getProgrammers() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http.get<string[]>('api/user/programmers/prog', {headers: headers}).pipe(
      map(data => {this.programmers = data;
        for(let i = 0; i<this.programmers.length; i++) {
          this.programmers[i]=new String(this.programmers[i]).toString();
        }
      }  
    ));
  }

  saveNewProject(p: ProjectViewModel) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http.post('/api/project/new', p, {
      headers: headers,
      responseType: 'text',
    });
  }

  updateProject(p: ProjectViewModel) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http.put('/api/project/', p, {
      headers: headers,
      responseType: 'text',
    });
  }

  deleteProject(p_id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http.delete('/api/project/projects/' + p_id, {
      headers: headers,
      responseType: 'text',
    });
  }

  updateUser(u: UserEditModel) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http.put('/api/account/updateUser/', u, {
      headers: headers,
      responseType: 'text',
    });
  }
}
