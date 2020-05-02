import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ClassicFunctionDisplayComponent } from './classic-function-display.component';

describe('ClassicFunctionDisplayComponent', () => {
  let component: ClassicFunctionDisplayComponent;
  let fixture: ComponentFixture<ClassicFunctionDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClassicFunctionDisplayComponent],
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ClassicFunctionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set functions', () => {
    component.functions = [
      {
        iconCls: 'Test1',
        name: 'Test1',
        value: true
      }, {
        iconCls: 'Test2',
        name: 'Test2',
        value: false
      }
    ];
    expect(component.functions.length).toEqual(2);
  });

  it('should resize', () => {
    const container = fixture.debugElement.query(By.css('[class=function-container]'));
    fixture.detectChanges();
    container.nativeElement.style.width = '200px';
    container.nativeElement.style.height = '300px';
    component.resize();
    expect(component).toBeTruthy();
  });


});
