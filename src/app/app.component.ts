import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Controller UI';

  public classicSpeedGaugeUnit = 'km/h';
  public classicSpeedGaugeValue = 0;
  public classicSpeedGaugeMaxSpeed = 120;

  public classicBrakeGaugeMaxGraduation = 1000;
  public classicBrakeGaugeMaxValue = 480;
  public classicBrakeGaugeValue = 0;
  public classicBrakeGaugeMaxSecValue = 700;
  public classicBrakeGaugeSecValue = 0;
  public classicBrakeGaugeUnit = 'kPa';

  public classicFunctionDisplayValue0 = true;
  public classicFunctionDisplayValue1 = false;
  public classicFunctionDisplayGroup = [{
    name: 'Fn0',
    userName: 'Fn0',
    value: this.classicFunctionDisplayValue0
  }, {
    name: 'Fn1',
    userName: 'Fn1',
    value: this.classicFunctionDisplayValue1
  }];

  public classicDirectionHandleBeginFrom = -1;
  public classicDirectionHandleSteps = 3;
  public classicDirectionHandleValue = 0;

  public classicRegulatorHandleGraduations = '01234';
  public classicRegulatorHandleSteps = 4;
  public classicRegulatorHandleValue = 0;

  public classicToggleSwitchValue = true;
  public classicToggleSwitchLabel = 'Switch demo';
  public classicToggleSwitchLabelPosition = 'bottom';

  public isPress = 'FALSE';
  public classicRoundButtonColor = '#FF0000';


  public classicFunctionDisplayToggleFn(value) {

    this['classicFunctionDisplayValue' + value] = !this['classicFunctionDisplayValue' + value];

    this.classicFunctionDisplayGroup = [{
      name: 'Fn0',
      userName: 'Fn0',
      value: this.classicFunctionDisplayValue0
    }, {
      name: 'Fn1',
      userName: 'Fn1',
      value: this.classicFunctionDisplayValue1
    }];
  }

  public classicToggleSwitchToggle() {
    this.classicToggleSwitchValue = !this.classicToggleSwitchValue;
  }

  public press() {
    this.isPress = 'TRUE';
    setTimeout(() => {
      this.isPress = 'FALSE';
    }, 1000);
  }

}
