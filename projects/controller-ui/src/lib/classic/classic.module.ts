import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassicSpeedGaugeComponent } from './classic-speed-gauge/classic-speed-gauge.component';
import { ClassicBrakeGaugeComponent } from './classic-brake-gauge/classic-brake-gauge.component';
import { ClassicDirectionHandleComponent } from './classic-direction-handle/classic-direction-handle.component';
import { ClassicFunctionDisplayComponent } from './classic-function-display/classic-function-display.component';
import { ClassicRegulatorHandleComponent } from './classic-regulator-handle/classic-regulator-handle.component';

import { DirectionHandleComponent } from './classic-direction-handle/direction-handle.component';
import { RegulatorHandleComponent } from './classic-regulator-handle/regulator-handle.component';
import { ClassicToggleSwitchComponent } from './classic-toggle-switch/classic-toggle-switch.component';
import { ClassicRoundButtonComponent } from './classic-round-button/classic-round-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ClassicSpeedGaugeComponent,
    ClassicBrakeGaugeComponent,
    ClassicDirectionHandleComponent,
    ClassicRegulatorHandleComponent,
    ClassicFunctionDisplayComponent,
    DirectionHandleComponent,
    RegulatorHandleComponent,
    ClassicToggleSwitchComponent,
    ClassicRoundButtonComponent
  ],
  exports: [
    ClassicSpeedGaugeComponent,
    ClassicBrakeGaugeComponent,
    ClassicDirectionHandleComponent,
    ClassicRegulatorHandleComponent,
    ClassicFunctionDisplayComponent,
    ClassicToggleSwitchComponent,
    ClassicRoundButtonComponent
  ]
})
export class ClassicModule { }
