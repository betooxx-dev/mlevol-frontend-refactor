import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusHandlerComponent } from './focus-handler.component';

describe('FocusHandlerComponent', () => {
  let component: FocusHandlerComponent;
  let fixture: ComponentFixture<FocusHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FocusHandlerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FocusHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
