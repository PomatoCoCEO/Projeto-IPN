import { TestBed } from '@angular/core/testing';

import { AuthActivator } from './auth-activator.service';

describe('AuthActivatorService', () => {
  let service: AuthActivator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthActivator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
