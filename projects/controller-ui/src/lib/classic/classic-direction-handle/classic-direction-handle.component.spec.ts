import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ClassicDirectionHandleComponent } from './classic-direction-handle.component';
import { DirectionHandleComponent } from './direction-handle.component';

describe('ClassicDirectionHandleComponent', () => {
  let component: ClassicDirectionHandleComponent;
  let fixture: ComponentFixture<ClassicDirectionHandleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClassicDirectionHandleComponent, DirectionHandleComponent],
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ClassicDirectionHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value', () => {
    component.beginFrom = 0;
    component.value = 2;
    expect(component.value).toEqual(2);
  });

  it('should pan', () => {
    const handle = fixture.debugElement.query(By.css('[class=ctrl-direction-container]'));
    component.value = 0;
    handle.triggerEventHandler('panstart', {
        preventDefault: () => {}
    });
    handle.triggerEventHandler('panmove', {
      preventDefault: () => {},
      deltaY: 20
    });
    fixture.detectChanges();
    expect(component.value).toEqual(1);
  });


});
