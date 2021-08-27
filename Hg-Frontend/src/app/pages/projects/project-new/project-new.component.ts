import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectAdderService } from 'src/app/services/project-adder/project-adder.service';
import { ProjectViewModel } from 'src/app/shared/projects';
import { TaskViewModel } from 'src/app/shared/tasks';

@Component({
  selector: 'project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.css'],
})
export class ProjectNewComponent implements OnInit {
  constructor(
    public projectAdder: ProjectAdderService,
    private router: Router
  ) {}
  public errorMessage = '';
  public editTask = false;
  public taskId = -1;

  // public taskToEdit: TaskViewModel | undefined;
  onTaskSaving() {
    // this.taskToEdit = task;
    // alert('Task being added ' + JSON.stringify(task));
    // document.getElementById('exampleModal')!.hidden = true;
    if (this.projectAdder.project.tasks == null) {
      this.projectAdder.project.tasks = [];
    }
    /*let k = this.projectAdder.project.tasks.findIndex(
      (t) => t.id == task.id && t.id != 0
    );*/
    if (this.taskId == -1) {
      this.projectAdder.project.tasks.push(this.projectAdder.taskToEdit); //
    } else {
      this.projectAdder.project.tasks[this.taskId] =
        this.projectAdder.taskToEdit; // update
    }
    // this.resetTask();
  }

  onTaskDeleting(taskId: number) {
    let k = taskId; // this.projectAdder.project.tasks.findIndex((t) => t.id == taskId);
    // eliminação em O(1) não transparente para o utilizador
    this.projectAdder.project.tasks[k] =
      this.projectAdder.project.tasks[
        this.projectAdder.project.tasks.length - 1
      ];
    this.projectAdder.project.tasks.pop();
  }

  onTaskEditing(taskId: number) {
    this.taskId = taskId;
    // let t = this.projectAdder.project.tasks.find((t) => t.id == taskId)!;
    if (taskId == -1) {
      this.projectAdder.taskToEdit = new TaskViewModel(); // for a new task
    } else {
      // for editing an existing task
      let t: TaskViewModel = this.projectAdder.project.tasks[taskId];
      let t2 = new TaskViewModel(t);
      this.projectAdder.taskToEdit = t2;
    }
  }

  saveProject() {
    // alert('Project:' + JSON.stringify(this.projectAdder.project));
    if (this.projectAdder.project.id != 0) {
      this.errorMessage = this.projectAdder.updateProject();
    } else this.errorMessage = this.projectAdder.saveNewProject();
    if (this.errorMessage == '') {
      this.projectAdder.project = new ProjectViewModel(); // creating new project for work
      this.router.navigate(['/projects']);
    }
  }

  ngOnInit(): void {}
}
