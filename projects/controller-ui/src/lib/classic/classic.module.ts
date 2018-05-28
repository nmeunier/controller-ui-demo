import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassicSpeedGaugeComponent } from './classic-speed-gauge/classic-speed-gauge.component';
import { ClassicBrakeGaugeComponent } from './classic-brake-gauge/classic-brake-gauge.component';
import { ClassicDirectionHandleComponent } from './classic-direction-handle/classic-direction-handle.component';
import { ClassicFunctionDisplayComponent } from './classic-function-display/classic-function-display.component';
import { ClassicRegulatorHandleComponent } from './classic-regulator-handle/classic-regulator-handle.component';

import { DirectionHandleComponent } from './classic-direction-handle/direction-handle.component';
import { RegulatorHandleComponent } from './classic-regulator-handle/regulator-handle.component';

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
    RegulatorHandleComponent
  ],
  exports: [
    ClassicSpeedGaugeComponent,
    ClassicBrakeGaugeComponent,
    ClassicDirectionHandleComponent,
    ClassicRegulatorHandleComponent,
    ClassicFunctionDisplayComponent
  ]
})
export class ClassicModule { }
