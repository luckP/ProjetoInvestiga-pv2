import { TestBed } from '@angular/core/testing';

import { NavBarServiceService } from './nav-bar-service.service';

describe('NavBarServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavBarServiceService = TestBed.get(NavBarServiceService);
    expect(service).toBeTruthy();
  });
});
