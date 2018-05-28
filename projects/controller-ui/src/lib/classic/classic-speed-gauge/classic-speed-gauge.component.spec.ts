import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassicSpeedGaugeComponent } from './classic-speed-gauge.component';
import { FontLoaderService } from '../../font-loader.service';

describe('ClassicSpeedGaugeComponent', () => {
  let fixture;
  it('should create', () => {
    TestBed.configureTestingModule({
      declarations: [ ClassicSpeedGaugeComponent ]
    });
    fixture = TestBed.createComponent(ClassicSpeedGaugeComponent);
    fixture.unit = 'Km/h';
    fixture.maxSpeed = 120;
    fixture.value = 80;
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
    const gaugePointer = cmp.querySelector('.gauge-pointer');
    console.log(gaugePointer);
    expect(gaugePointer).not.toBeNull();
  });
});
