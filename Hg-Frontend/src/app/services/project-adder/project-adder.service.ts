import { Injectable } from '@angular/core';
import { ProjectViewModel } from 'src/app/shared/projects';
import { TaskViewModel } from 'src/app/shared/tasks';
import { HttpService } from '../httpService/http.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectAdderService {
  public project = new ProjectViewModel();
  public taskToEdit = new TaskViewModel();
  public programmers: string[] = [];
  constructor(private http: HttpService) {
    this.project.tasks = [];
    this.http.getProgrammers().subscribe(
      () => {
        this.programmers = this.http.programmers;
      },
      (error) => {
        alert('Error getting programmers: ' + error.error);
      }
    );
  }
  addTask(t: TaskViewModel) {
    this.project.tasks.push(t);
  }

  saveNewProject(): string {
    let s = '';
    this.http.saveNewProject(this.project).subscribe(
      () => {
        alert('Project created');
        this.project = new ProjectViewModel(); // resetting the values
      },
      (error) => {
        s = error.error;
      }
    );
    return s;
  }

  updateProject() {
    let s = '';
    this.http.updateProject(this.project).subscribe(
      () => {
        alert('Project updated successfully');
        this.project = new ProjectViewModel(); // resetting the values
      },
      (error) => {
        alert('Error ' + error.error);
        s = error.error;
      }
    );
    return s;
  }
}
