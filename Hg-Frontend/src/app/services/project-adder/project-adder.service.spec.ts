import { TestBed } from '@angular/core/testing';

import { ProjectAdderService } from './project-adder.service';

describe('ProjectAdderService', () => {
  let service: ProjectAdderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectAdderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
