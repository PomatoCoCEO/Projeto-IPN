import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'no-tasks',
  templateUrl: './no-tasks-coloured.component.html',
  styleUrls: ['./no-tasks-coloured.component.css']
})
export class NoTasksColouredComponent implements OnInit {

  @Input() no:number=0;
  @Input() success:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
