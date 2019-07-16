import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassicToggleSwitchComponent } from './classic-toggle-switch.component';

describe('ClassicToggleSwitchComponent', () => {
  let component: ClassicToggleSwitchComponent;
  let fixture: ComponentFixture<ClassicToggleSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassicToggleSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassicToggleSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label in a class="switch-label" tag', async(() => {
    fixture = TestBed.createComponent(ClassicToggleSwitchComponent);
    component = fixture.componentInstance;
    component.label = 'Test Label';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.switch-label').textContent).toContain('Test Label');
  }));

});
