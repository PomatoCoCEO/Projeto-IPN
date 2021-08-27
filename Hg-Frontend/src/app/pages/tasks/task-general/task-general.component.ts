import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/httpService/http.service';
import { TaskViewModel } from 'src/app/shared/tasks';
import { TaskStateComponent } from '../task-state/task-state.component';

@Component({
  selector: 'app-task-general',
  templateUrl: './task-general.component.html',
  styleUrls: ['./task-general.component.css'],
})
export class TaskGeneralComponent implements OnInit {
  public tasks: TaskViewModel[] = [];
  constructor(private http: HttpService) {}
  ngOnInit(): void {
    this.http.getTasks().subscribe(
      () => {
        this.tasks = this.http.tasks;
      },
      (error) => {
        alert('Error getting tasks: ' + error.error);
      }
    );
    // alert(JSON.stringify(this.tasks));
  }

  public hasPassed(d: Date) {
    // console.log(typeof d); // STRING!!
    /*
    let di = '' + d;
    let r = Date.parse(di);
    return r - new Date().getTime() < 0;*/
    return d < new Date();
  }

  setFinished(task_id: number) {
    this.http.setTaskFinished(task_id).subscribe(
      () => {
        let k = this.tasks.findIndex((t) => t.id == task_id);
        this.tasks[k].finished = true;
        alert('Task finished');
      },
      (error) => {
        alert('Error: ' + error.error);
      }
    );
  }
}
