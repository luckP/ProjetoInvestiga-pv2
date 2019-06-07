import { TestBed } from '@angular/core/testing';

import { NavBarService } from './nav-bar-service.service';

describe('NavBarServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavBarService = TestBed.get(NavBarService);
    expect(service).toBeTruthy();
  });
});
