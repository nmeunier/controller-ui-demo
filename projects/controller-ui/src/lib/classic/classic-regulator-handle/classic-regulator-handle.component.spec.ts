import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ClassicRegulatorHandleComponent } from './classic-regulator-handle.component';
import { RegulatorHandleComponent } from './regulator-handle.component';

describe('ClassicRegulatorHandleComponent', () => {
  let component: ClassicRegulatorHandleComponent;
  let fixture: ComponentFixture<ClassicRegulatorHandleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClassicRegulatorHandleComponent, RegulatorHandleComponent],
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ClassicRegulatorHandleComponent);
    fixture.nativeElement.style.width = '200px';
    fixture.nativeElement.height = '200px';
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value', () => {
    component.value = 0.5;
    expect(component.value).toEqual(0.5);
  });

  it('should pan 1', () => {
    const handle = fixture.debugElement.query(By.css('[class=ctrl-traction-container]'));
    component.steps = 5;
    component.value = 0;
    component.graduations = '01234';
    handle.triggerEventHandler('panstart', {
        preventDefault: () => {}
    });
    handle.triggerEventHandler('panmove', {
      preventDefault: () => {},
      center: {
        x: 10,
        y: 10
      }
    });
    fixture.detectChanges();
    expect(component.value).toEqual(1);
  });

  it('should pan 2', () => {
    const handle = fixture.debugElement.query(By.css('[class=ctrl-traction-container]'));
    component.steps = 5;
    component.value = 0;
    component.graduations = '01234';
    handle.triggerEventHandler('panstart', {
        preventDefault: () => {}
    });
    handle.triggerEventHandler('panmove', {
      preventDefault: () => {},
      center: {
        x: 10,
        y: 73
      }
    });
    fixture.detectChanges();
    expect(component.value).toEqual(0.2);
  });

  it('should pan 3', () => {
    const handle = fixture.debugElement.query(By.css('[class=ctrl-traction-container]'));
    component.handleRotateAxisX = 50;
    component.handleRotateAxisY = 225;
    component.steps = 5;
    component.value = 0;
    component.graduations = '01234';
    handle.triggerEventHandler('panstart', {
        preventDefault: () => {}
    });
    handle.triggerEventHandler('panmove', {
      preventDefault: () => {},
      center: {
        x: -10,
        y: 74
      }
    });
    fixture.detectChanges();
    expect(component.value).toEqual(1);
  });

  it('should set graduations', () => {
    component.steps = 3;
    component.graduations = '012';
    component.ngAfterContentInit();
    fixture.detectChanges();
    expect(component.steps).toEqual(3);
  });

  it('should change graduations', () => {
    component.steps = 3;
    component.graduations = '012';
    component.ngOnChanges();
    fixture.detectChanges();
    expect(component.steps).toEqual(3);
  });


});
