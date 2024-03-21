import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphLayersComponent } from './graph-layers.component';

describe('GraphLayersComponent', () => {
  let component: GraphLayersComponent;
  let fixture: ComponentFixture<GraphLayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraphLayersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
