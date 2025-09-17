import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CodeAssessComponent } from "./code-assess.component";

describe("CodeAssessComponent", () => {
  let component: CodeAssessComponent;
  let fixture: ComponentFixture<CodeAssessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeAssessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CodeAssessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
