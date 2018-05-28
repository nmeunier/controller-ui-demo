import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassicBrakeGaugeComponent } from './classic-brake-gauge.component';

describe('ClassicBrakeGaugeComponent', () => {
  let fixture;
  it('should create', () => {
    TestBed.configureTestingModule({
      declarations: [ ClassicBrakeGaugeComponent ]
    });
    fixture = TestBed.createComponent(ClassicBrakeGaugeComponent);
    fixture.flex = false;
    fixture.size = '300px';
    fixture.unit = 'kPa';
    fixture.maxGraduation = 1000;
    fixture.maxValue = 480;
    fixture.value = 0;
    fixture.maxValue = 800;
    fixture.value = 500;
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
  it('should have <canvas #gauge>', () => {
    const cmp: HTMLElement = fixture.nativeElement;
    const gauge = cmp.querySelector('canvas');
    console.log(gauge);
    expect(gauge).not.toBeNull();
  });
  it('should have <canvas #gaugePointer>', () => {
    const cmp: HTMLElement = fixture.nativeElement;
    const gaugePointer = cmp.querySelector('.pointer-primary');
    console.log(gaugePointer);
    expect(gaugePointer).not.toBeNull();
  });
  // TODO gaugeSecPointer
  it('should have <canvas #gaugeSecPointer>', () => {
    const cmp: HTMLElement = fixture.nativeElement;
    const gaugePointer = cmp.querySelector('.pointer-secondary');
    console.log(gaugePointer);
    expect(gaugePointer).not.toBeNull();
  });
});
