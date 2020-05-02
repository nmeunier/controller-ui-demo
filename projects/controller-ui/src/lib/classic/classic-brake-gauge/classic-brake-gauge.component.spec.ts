import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassicBrakeGaugeComponent } from './classic-brake-gauge.component';

describe('ClassicBrakeGaugeComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClassicBrakeGaugeComponent]
    });

    TestBed.compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(ClassicBrakeGaugeComponent);
    const testComponent = fixture.debugElement.componentInstance;

    testComponent.flex = false;
    testComponent.size = '300px';
    testComponent.unit = 'kPa';
    testComponent.maxGraduation = 1000;
    testComponent.maxValue = 480;
    testComponent.value = 0;
    testComponent.maxValue = 800;
    testComponent.value = 500;
    const component = fixture.componentInstance;
    component.ngAfterContentInit( );
    component.ngAfterViewInit( );
    fixture.detectChanges( );
    expect(component).toBeDefined();
  });

  it('should have <canvas #gauge>', () => {
    const fixture = TestBed.createComponent(ClassicBrakeGaugeComponent);
    const cmp: HTMLElement = fixture.nativeElement;
    const gauge = cmp.querySelector('canvas');
    expect(gauge).not.toBeNull();
  });

  it('should have <canvas #gaugePointer>', () => {
    const fixture = TestBed.createComponent(ClassicBrakeGaugeComponent);
    const cmp: HTMLElement = fixture.nativeElement;
    const gaugePointer = cmp.querySelector('.pointer-primary');
    expect(gaugePointer).not.toBeNull();
  });

  it('should have <canvas #gaugeSecPointer>', () => {
    const fixture = TestBed.createComponent(ClassicBrakeGaugeComponent);
    const cmp: HTMLElement = fixture.nativeElement;
    const gaugePointer = cmp.querySelector('.pointer-secondary');
    expect(gaugePointer).not.toBeNull();
  });

  it('should have <canvas #gaugeSecPointer>', () => {
    const fixture = TestBed.createComponent(ClassicBrakeGaugeComponent);
    const cmp: HTMLElement = fixture.nativeElement;
    const gaugePointer = cmp.querySelector('.pointer-secondary');
    expect(gaugePointer).not.toBeNull();
  });

  it('should limit value >= 0', () => {
    const fixture = TestBed.createComponent(ClassicBrakeGaugeComponent);
    const testComponent = fixture.debugElement.componentInstance;
    testComponent.maxGraduation = 1000;
    testComponent.maxValue = 480;
    testComponent.maxSecValue = 700;
    fixture.detectChanges();
    testComponent.value = -1;
    expect(testComponent.value).toEqual(0);
  });

  it('should limit secValue >= 0', () => {
    const fixture = TestBed.createComponent(ClassicBrakeGaugeComponent);
    const testComponent = fixture.debugElement.componentInstance;
    testComponent.maxGraduation = 1000;
    testComponent.maxValue = 480;
    testComponent.maxSecValue = 700;
    fixture.detectChanges();
    testComponent.secValue = -1;
    expect(testComponent.secValue).toEqual(0);
  });

  it('should limit value <= 1', () => {
    const fixture = TestBed.createComponent(ClassicBrakeGaugeComponent);
    const testComponent = fixture.debugElement.componentInstance;
    testComponent.maxGraduation = 1000;
    testComponent.maxValue = 480;
    testComponent.maxSecValue = 700;
    fixture.detectChanges();
    testComponent.value = 2;
    expect(testComponent.value).toEqual(1);
  });

  it('should limit secValue <= 1', () => {
    const fixture = TestBed.createComponent(ClassicBrakeGaugeComponent);
    const testComponent = fixture.debugElement.componentInstance;
    testComponent.maxGraduation = 1000;
    testComponent.maxValue = 480;
    testComponent.maxSecValue = 700;
    fixture.detectChanges();
    testComponent.secValue = 2;
    expect(testComponent.secValue).toEqual(1);
  });

  it('should limit rotation to 0', () => {
    const fixture = TestBed.createComponent(ClassicBrakeGaugeComponent);
    const testComponent = fixture.debugElement.componentInstance;
    testComponent.maxGraduation = 1000;
    testComponent.maxValue = 480;
    testComponent.maxSecValue = 700;
    testComponent.value = 0;
    fixture.detectChanges();
    testComponent.value = -1;
    expect(testComponent.rotateValue).toEqual(0);
  });

  it('should limit rotation to 110.4', () => {
    const fixture = TestBed.createComponent(ClassicBrakeGaugeComponent);
    const testComponent = fixture.debugElement.componentInstance;
    testComponent.maxGraduation = 1000;
    testComponent.maxValue = 480;
    testComponent.maxSecValue = 700;
    testComponent.value = 0;
    fixture.detectChanges();
    testComponent.value = 2;
    expect(testComponent.rotateValue).toEqual(110.4);
  });

  it('should limit sec rotation to 161', () => {
    const fixture = TestBed.createComponent(ClassicBrakeGaugeComponent);
    const testComponent = fixture.debugElement.componentInstance;
    testComponent.maxGraduation = 1000;
    testComponent.maxValue = 480;
    testComponent.maxSecValue = 700;
    testComponent.secValue = 0;
    fixture.detectChanges();
    testComponent.secValue = 2;
    expect(testComponent.secRotateValue).toEqual(161);
  });

  it('should set maxValue', () => {
    const fixture = TestBed.createComponent(ClassicBrakeGaugeComponent);
    const testComponent = fixture.debugElement.componentInstance;
    testComponent.unit = 'kPa';
    testComponent.maxGraduation = 1000;
    testComponent.maxValue = 480;
    testComponent.maxSecValue = 700;
    testComponent.value = 0;
    fixture.detectChanges();
    testComponent.value = 0.5;
    testComponent.maxValue = 600;
    testComponent.ngOnChanges();
    expect(testComponent.maxValue).toEqual(600);
  });

  it('should set maxSecValue', () => {
    const fixture = TestBed.createComponent(ClassicBrakeGaugeComponent);
    const testComponent = fixture.debugElement.componentInstance;
    testComponent.unit = 'kPa';
    testComponent.maxGraduation = 1000;
    testComponent.maxValue = 480;
    testComponent.maxSecValue = 700;
    testComponent.value = 0;
    fixture.detectChanges();
    testComponent.value = 0.5;
    testComponent.maxSecValue = 800;
    testComponent.ngOnChanges();
    expect(testComponent.maxSecValue).toEqual(800);
  });

});
