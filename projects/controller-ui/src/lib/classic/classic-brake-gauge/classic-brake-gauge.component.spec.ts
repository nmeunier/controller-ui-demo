import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassicBrakeGaugeComponent } from './classic-brake-gauge.component';
import { FontLoaderService } from '../../font-loader.service';
import { MockFontLoader } from '../../test/MockFontLoader';

describe('ClassicBrakeGaugeComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClassicBrakeGaugeComponent],
      providers: [
        { provide: FontLoaderService, useClass: MockFontLoader },
      ]
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

});
