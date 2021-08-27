import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ProjectAdderService } from 'src/app/services/project-adder/project-adder.service';
import { TaskViewModel } from 'src/app/shared/tasks';

@Component({
  selector: 'edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
  constructor(public projectAdder: ProjectAdderService) {}
  // @Input() taskInput: TaskViewModel | undefined;
  // @Input() edit = false;
  // public programmerUsername: string = '';
  @Output() taskEmmiter = new EventEmitter<void>();
  // @Input() modalHidden = false;
  public task = new TaskViewModel();
  /*public taskInit() {
    return this.taskInput == undefined ? new TaskViewModel() : this.taskInput;
  }*/
  onDeadlineChange(d: Date) {
    this.projectAdder.taskToEdit.deadline = d;
  }
  onSubmit() {
    this.task = this.projectAdder.taskToEdit;
    this.taskEmmiter.emit(); // might be simplified using only a service pattern
    this.projectAdder.taskToEdit = new TaskViewModel(); // resetting the value
    // alert('Should be added by now...');
  }
  ngOnInit(): void {}
}
