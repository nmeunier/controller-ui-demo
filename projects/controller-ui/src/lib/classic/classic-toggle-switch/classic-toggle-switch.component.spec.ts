import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ClassicToggleSwitchComponent } from './classic-toggle-switch.component';

describe('ClassicToggleSwitchComponent', () => {
  let component: ClassicToggleSwitchComponent;
  let fixture: ComponentFixture<ClassicToggleSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClassicToggleSwitchComponent],
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ClassicToggleSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value', () => {
    component.value = true;
    expect(component.value).toEqual(true);
  });

  it('should pan', () => {
    const handle = fixture.debugElement.query(By.css('[class=toggle-container]'));
    component.value = false;
    handle.triggerEventHandler('panstart', {
        preventDefault: () => {}
    });
    handle.triggerEventHandler('panmove', {
      preventDefault: () => {},
      deltaY: -10
    });
    fixture.detectChanges();
    expect(component.value).toEqual(true);
  });

  it('should render label in a class="switch-label" tag', async(() => {
    component.label = 'Test Label';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.switch-label').textContent).toContain('Test Label');
  }));

});
