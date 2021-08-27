import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/httpService/http.service';
import { ProjectViewModel } from 'src/app/shared/projects';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  public project: ProjectViewModel = new ProjectViewModel();
  constructor(private http: HttpService, private acRoute: ActivatedRoute) {}

  ngOnInit(): void {
    let id: number = Number(this.acRoute.snapshot.paramMap.get('id'));
    this.http.getProject(id).subscribe(
      () => {
        this.project = this.http.projectDetails;
      },
      (error) => {
        alert('Error: ' + error.error);
      }
    );
  }
}
