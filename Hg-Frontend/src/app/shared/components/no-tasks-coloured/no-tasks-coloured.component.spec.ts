import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoTasksColouredComponent } from './no-tasks-coloured.component';

describe('NoTasksColouredComponent', () => {
  let component: NoTasksColouredComponent;
  let fixture: ComponentFixture<NoTasksColouredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoTasksColouredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoTasksColouredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
