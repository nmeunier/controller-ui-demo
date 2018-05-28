import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassicRegulatorHandleComponent } from './classic-regulator-handle.component';
import { RegulatorHandleComponent } from './regulator-handle.component';

describe('ClassicRegulatorHandleComponent', () => {
  let component: ClassicRegulatorHandleComponent;
  let fixture: ComponentFixture<ClassicRegulatorHandleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassicRegulatorHandleComponent, RegulatorHandleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassicRegulatorHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
