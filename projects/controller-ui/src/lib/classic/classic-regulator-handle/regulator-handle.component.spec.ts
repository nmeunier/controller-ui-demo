import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulatorHandleComponent } from './regulator-handle.component';

describe('RegulatorHandleComponent', () => {
  let component: RegulatorHandleComponent;
  let fixture: ComponentFixture<RegulatorHandleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegulatorHandleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulatorHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
