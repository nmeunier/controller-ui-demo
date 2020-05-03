import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ClassicRoundButtonComponent } from './classic-round-button.component';

describe('ClassicRoundButtonComponent', () => {
  let component: ClassicRoundButtonComponent;
  let fixture: ComponentFixture<ClassicRoundButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClassicRoundButtonComponent],
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ClassicRoundButtonComponent);

    component = fixture.componentInstance;
    component.color = '#CC0000';
    fixture.detectChanges();
  }));

  it('should create', () => {
    const testComponent = fixture.debugElement.componentInstance;
    testComponent.press = () => {};
    fixture.detectChanges();
    expect(testComponent).toBeDefined();
  });


  it('should press', () => {
    const testComponent = fixture.debugElement.componentInstance;
    let pressed = false;
    testComponent.press.subscribe(() => {
      pressed = true;
    });
    const handle = fixture.debugElement.query(By.css('[class=button]'));
    handle.triggerEventHandler('click', {
        preventDefault: () => {}
    });
    fixture.detectChanges();
    expect(pressed).toEqual(true);
  });

  it('should be black', () => {
    const testComponent = fixture.debugElement.componentInstance;
    testComponent.color = '#000000';
    fixture.detectChanges();
    testComponent.ngOnChanges();
    expect(testComponent).toBeDefined();
  });

  it('should be white', () => {
    const testComponent = fixture.debugElement.componentInstance;
    testComponent.color = '#ffffff';
    fixture.detectChanges();
    testComponent.ngOnChanges();
    expect(testComponent).toBeDefined();
  });

  it('should resize', () => {
    const container = fixture.debugElement.query(By.css('[class=button-container]'));
    fixture.detectChanges();
    container.nativeElement.style.width = '200px';
    container.nativeElement.style.height = '300px';
    component.resize();
    expect(component).toBeTruthy();
  });

});
