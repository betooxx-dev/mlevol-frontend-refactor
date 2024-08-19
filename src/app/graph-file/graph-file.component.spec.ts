import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphFileComponent } from './graph-file.component';

describe('GraphFileComponent', () => {
  let component: GraphFileComponent;
  let fixture: ComponentFixture<GraphFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraphFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
