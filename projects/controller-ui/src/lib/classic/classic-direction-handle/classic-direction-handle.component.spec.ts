import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassicDirectionHandleComponent } from './classic-direction-handle.component';
import { DirectionHandleComponent } from './direction-handle.component';

describe('ClassicDirectionHandleComponent', () => {
  let component: ClassicDirectionHandleComponent;
  let fixture: ComponentFixture<ClassicDirectionHandleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassicDirectionHandleComponent, DirectionHandleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassicDirectionHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
