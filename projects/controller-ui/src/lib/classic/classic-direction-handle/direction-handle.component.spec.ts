import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionHandleComponent } from './direction-handle.component';

describe('DirectionHandleComponent', () => {
  let component: DirectionHandleComponent;
  let fixture: ComponentFixture<DirectionHandleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectionHandleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectionHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
