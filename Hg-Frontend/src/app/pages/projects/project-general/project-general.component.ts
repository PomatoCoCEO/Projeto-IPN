import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/httpService/http.service';
import { ProjectAdderService } from 'src/app/services/project-adder/project-adder.service';
import { GeneralFunctions } from 'src/app/shared/generalFunctions';
import { ProjectViewModel } from 'src/app/shared/projects';
import { TaskViewModel } from 'src/app/shared/tasks';

@Component({
  selector: 'app-project-general',
  templateUrl: './project-general.component.html',
  styleUrls: ['./project-general.component.css'],
})
export class ProjectGeneralComponent implements OnInit {
  public projects: ProjectViewModel[] = [];
  public g = new GeneralFunctions();
  constructor(
    private http: HttpService,
    private router: Router,
    private projectAdder: ProjectAdderService
  ) {}

  public noTasksFinished(project: ProjectViewModel) {
    return project.tasks.filter((t) => t.finished).length;
  }

  public isFailed(t: TaskViewModel): boolean {
    if (t.finished) return false;
    // return Date.parse('' + t.deadline) < new Date().getTime();
    return this.g.hasPassed(t.deadline);
  }

  public noTasksFailed(project: ProjectViewModel) {
    return project.tasks.filter((t) => this.isFailed(t)).length;
  }

  public editProject(id: number) {
    this.projectAdder.project = this.projects[id];
    this.router.navigate(['/project/new']);
  }

  public deleteProject(id: number) {
    this.http.deleteProject(this.projects[id].id).subscribe(() => {
      this.projects[id] = this.projects[this.projects.length - 1];
      this.projects.pop();
      alert('Project removed successfully');
    });
    this.router.navigate(['/projects']);
  }

  ngOnInit(): void {
    this.http
      .getProjects()
      .subscribe(() => (this.projects = this.http.projects));
  }
}
