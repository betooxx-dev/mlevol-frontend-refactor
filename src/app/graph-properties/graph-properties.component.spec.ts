import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphPropertiesComponent } from './graph-properties.component';

describe('GraphPropertiesComponent', () => {
  let component: GraphPropertiesComponent;
  let fixture: ComponentFixture<GraphPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraphPropertiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
