import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectAdderService } from 'src/app/services/project-adder/project-adder.service';
import { TaskViewModel } from 'src/app/shared/tasks';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  @Input() tasks: TaskViewModel[] = [];
  @Output() taskDeleter = new EventEmitter<number>(); // will delete a task by its id
  @Output() taskEditor = new EventEmitter<number>();
  @Input() edit: string = 'false';
  constructor(private projectAdder: ProjectAdderService) {}
  public indexArray(no: number) {
    return [...Array(no).keys()];
  }
  onDelete(taskId: number) {
    this.taskDeleter.emit(taskId);
  }
  onEdit(taskId: number) {
    this.taskEditor.emit(taskId);
  }

  ngOnInit(): void {}
}
