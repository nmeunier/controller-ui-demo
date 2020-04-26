import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

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
    const testComponent = fixture.debugElement.componentInstance;
    const cmp: HTMLElement = fixture.nativeElement;
    const gauge = cmp.querySelector('canvas');
    expect(gauge).not.toBeNull();
  });
  it('should have <canvas #gaugePointer>', () => {
    const fixture = TestBed.createComponent(ClassicSpeedGaugeComponent);
    const testComponent = fixture.debugElement.componentInstance;
    const cmp: HTMLElement = fixture.nativeElement;
    const gaugePointer = cmp.querySelector('.gauge-pointer');
    expect(gaugePointer).not.toBeNull();
  });
});
