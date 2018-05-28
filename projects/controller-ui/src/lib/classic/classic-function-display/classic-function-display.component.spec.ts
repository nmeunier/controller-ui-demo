import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassicFunctionDisplayComponent } from './classic-function-display.component';

describe('ClassicFunctionDisplayComponent', () => {
  let component: ClassicFunctionDisplayComponent;
  let fixture: ComponentFixture<ClassicFunctionDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassicFunctionDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassicFunctionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
