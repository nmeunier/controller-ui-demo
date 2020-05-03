import {async, TestBed} from '@angular/core/testing';

import { ClassicSpeedGaugeComponent } from './classic-speed-gauge.component';

describe('ClassicSpeedGaugeComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClassicSpeedGaugeComponent]
    });

    TestBed.compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(ClassicSpeedGaugeComponent);
    const testComponent = fixture.debugElement.componentInstance;
    testComponent.unit = 'Km/h';
    testComponent.maxSpeed = 120;
    testComponent.value = 0;
    fixture.detectChanges();
    testComponent.value = 80;
    expect(testComponent).toBeDefined();
  });


  it('should have <canvas #gauge>', () => {
    const fixture = TestBed.createComponent(ClassicSpeedGaugeComponent);
    const cmp: HTMLElement = fixture.nativeElement;
    const gauge = cmp.querySelector('canvas');
    expect(gauge).not.toBeNull();
  });

  it('should have <canvas #gaugePointer>', () => {
    const fixture = TestBed.createComponent(ClassicSpeedGaugeComponent);
    const cmp: HTMLElement = fixture.nativeElement;
    const gaugePointer = cmp.querySelector('.gauge-pointer');
    expect(gaugePointer).not.toBeNull();
  });

  it('should limit value >= 0', () => {
    const fixture = TestBed.createComponent(ClassicSpeedGaugeComponent);
    const testComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    testComponent.value = -1;
    expect(testComponent.value).toEqual(0);
  });

  it('should limit value <= 1', () => {
    const fixture = TestBed.createComponent(ClassicSpeedGaugeComponent);
    const testComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    testComponent.value = 2;
    expect(testComponent.value).toEqual(1);
  });

  it('should limit rotation to 0', () => {
    const fixture = TestBed.createComponent(ClassicSpeedGaugeComponent);
    const testComponent = fixture.debugElement.componentInstance;
    testComponent.value = 0;
    fixture.detectChanges();
    testComponent.value = -1;
    expect(testComponent.rotateValue).toEqual(0);
  });

  it('should limit rotation to 230', () => {
    const fixture = TestBed.createComponent(ClassicSpeedGaugeComponent);
    const testComponent = fixture.debugElement.componentInstance;
    testComponent.value = 0;
    fixture.detectChanges();
    testComponent.value = 2;
    expect(testComponent.rotateValue).toEqual(230);
  });

  it('should set maxSpeed', () => {
    const fixture = TestBed.createComponent(ClassicSpeedGaugeComponent);
    const testComponent = fixture.debugElement.componentInstance;
    testComponent.unit = 'Km/h';
    testComponent.maxSpeed = 120;
    testComponent.value = 0;
    fixture.detectChanges();
    testComponent.value = 0.5;
    testComponent.maxSpeed = 80;
    testComponent.ngOnChanges();
    expect(testComponent.maxSpeed).toEqual(80);
  });

});
