import { Component, Input, OnInit } from '@angular/core';
import { TaskViewModel } from 'src/app/shared/tasks';

@Component({
  selector: 'task-state',
  templateUrl: './task-state.component.html',
  styleUrls: ['./task-state.component.css'],
})
export class TaskStateComponent implements OnInit {
  @Input() task = new TaskViewModel();

  public hasPassed(d: Date) {
    // console.log(typeof d); // STRING!!
    /*let di = '' + d;
    let r = Date.parse(di);
    return r - new Date().getTime() < 0;*/
    return d < new Date();
  }

  constructor() {}

  ngOnInit(): void {}
}
