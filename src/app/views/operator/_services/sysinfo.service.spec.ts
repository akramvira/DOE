import { TestBed } from '@angular/core/testing';

import { SysinfoService } from './sysinfo.service';

describe('SysinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysinfoService = TestBed.get(SysinfoService);
    expect(service).toBeTruthy();
  });
});
