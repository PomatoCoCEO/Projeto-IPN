import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarHgComponent } from './navbar-hg.component';

describe('NavbarHgComponent', () => {
  let component: NavbarHgComponent;
  let fixture: ComponentFixture<NavbarHgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarHgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarHgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
