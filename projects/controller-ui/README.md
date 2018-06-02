# Controller Ui library

Controller Ui is a component library for Angular.
This library is designed to create interfaces inspired by train cockpit and contains gauges, handlers and indicators.

## Prerequisites

Before using Controller Ui in your project, install the needed dependencies :

* Install Hammer.js
``` 
npm install --save hammerjs
```

Import hammerjs in your Angular project by adding this line in your src/main.js

```ts
import 'hammerjs';
```

* Install Web Font Loader 
```
npm install --save webfontloader
```

## Installation

```
npm install controller-ui
```

## Classic components

Gauge and handle UI inspirate from 60'/80' train cockpit. Especialy [JR 103 cockpit](https://commons.wikimedia.org/wiki/File:JNR_Tc103-235cab.jpg#/media/File:JNR_Tc103-235cab.jpg) 

### Using classic module

In your angular module import the classic module from Controller UI

```ts
import { ClassicModule } from 'controller-ui';
```

And import it to your modules
```ts
@NgModule({
  declarations: [],
  imports: [
    ClassicModule
  ],

})
```


#### Classic brake gauge

Pressure brake style gauge

```html
<cui-classic-brake-gauge 
    [value]="classicBrakeGaugeValue" 
    [maxValue]="classicBrakeGaugeMaxValue" 
    [secValue]="classicBrakeGaugeSecValue" 
    [maxSecValue]="classicBrakeGaugeMaxSecValue" 
    [maxGraduation]="classicBrakeGaugeMaxGraduation" 
    [unit]="classicBrakeGaugeUnit">
</cui-classic-brake-gauge>
```

| Parameter | Description | Type |
| --- | --- | --- |
| value | Value for the first (black) pointer | Number between 0 and 1 |
| maxValue | Maximum value for the fist pointer (when value = 1) | Number |
| secValue | Value for the second (red) pointer | Number between 0 and 1 |
| maxSecValue | Maximum value for the second pointer (when value = 1) | Number |
| maxGraduation | Maximum value for the second pointer (when value = 1) | Number |
| unit | Text displayed on the gauge unit zone | String |



#### Classic speed gauge

Speed gauge style gauge

```html
<cui-classic-speed-gauge 
    [value]="classicSpeedGaugeValue" 
    [maxSpeed]="classicSpeedGaugeMaxValue" 
    [unit]="classicSpeedGaugeUnit">
</cui-classic-speed-gauge>
```

| Parameter | Description | Type |
| --- | --- | --- |
| value | Value to display | Number between 0 and 1 |
| maxSpeed | Maximum value (when value = 1) | Number |
| unit | Text displayed on the gauge unit zone (default km/h) | String |



#### Classic function display

Light indicator for display functions status

```html
<cui-classic-function-display 
  [functions]="classicFunctionDisplayGroup">
</cui-classic-function-display>
```

| Parameter | Description | Type |
| --- | --- | --- |
| functions | Functions description | Array of Object |


##### Function object example

```JS
{
  name: 'Fn0',
  userName: 'Headlights',
  iconCls: 'rf rf-headlight'
  value: this.classicFunctionDisplayValue0
}
```

##### Function object definition

| Property | Description | Type |
| --- | --- | --- |
| name | Function internal name | String |
| userName | Function display name (used when iconCls is undefined) | String |
| iconCls | CSS class to used for the function | String |
| value | Value of the function | Boolean |

##### Note: 
For a rail icon set see the project : [RailFont project](https://github.com/nmeunier/RailFont)



#### Classic direction handle

Direction handle component

```html
<cui-classic-direction-handle 
  [beginFrom]="classicDirectionHandleBeginFrom"
  [steps]="classicDirectionHandleSteps"
  [(value)]="classicDirectionHandleValue">
</cui-classic-direction-handle>
```

| Parameter | Description | Type |
| --- | --- | --- |
| beginFrom | beginning value for the first position | number |
| steps | Number of positions | number |
| value | current value (Two way binding property) | number |



#### Classic manipulator handle

Manipulator handle component

```html
<cui-classic-regulator-handle 
  [graduations]="classicRegulatorHandleGraduations" 
  [steps]="classicRegulatorHandleSteps" 
  [(value)]="classicRegulatorHandleValue">
</cui-classic-regulator-handle>
```

| Parameter | Description | Type |
| --- | --- | --- |
| graduations | Graduation to display (example: "1234") | String (array of chars) |
| steps | Number of positions | number |
| value | current value (Two way binding property) | number |



#### Classic toggle switch

Toggle switch component

```html
<cui-classic-toggle-switch 
  [label]="classicToggleSwitchLabel"
  [labelPosition]="classicToggleSwitchLabelPosition"
  [(value)]="classicToggleSwitchValue">
</cui-classic-toggle-switch>
```

| Parameter | Description | Type |
| --- | --- | --- |
| label | Text to display in label | String |
| labelPosition | Label position (bottom / top) | String |
| value | current value (Two way binding property) | Boolean |





## License

[GNU Public License, version 3](https://www.gnu.org/licenses/quick-guide-gplv3.fr.html)
