import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGeneralComponent } from './task-general.component';

describe('TaskGeneralComponent', () => {
  let component: TaskGeneralComponent;
  let fixture: ComponentFixture<TaskGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
