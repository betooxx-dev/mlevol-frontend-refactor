import { TestBed } from '@angular/core/testing';

import { PanelFocusService } from './panel-focus.service';

describe('PanelFocusService', () => {
  let service: PanelFocusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanelFocusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
