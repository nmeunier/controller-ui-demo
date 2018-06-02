import { Component, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'cui-classic-toggle-switch',
  templateUrl: './classic-toggle-switch.component.html',
  styleUrls: ['./classic-toggle-switch.component.css']
})
export class ClassicToggleSwitchComponent {

    private _value = true;
    private steps = 2;
    public x = 0;
    private startY = 0;
    public containerHeight = 200;
    public containerWidth = 100;
    public cursorHeight = this.containerHeight / 3;
    public y = this.cursorHeight * 0.5;

    @ViewChild('switchBtn') switchBtn: ElementRef;
    @ViewChild('toggleCtn') toggleCtn: ElementRef;
    @Input() label: string;
    @Input() labelPosition?: string;

    constructor() { }

    @Output() valueChange = new EventEmitter();
    @Input()
    get value() {
        return this._value;
    }

    set value(val: boolean) {
        if (this._value !== val) {
            this._value = val;
            this.valueChange.emit(this._value);

            if (this._value) {
              this.y = this.cursorHeight * 0.5;
            } else {
              this.y = this.cursorHeight * 1.5;
            }

        }
    }

    onPanStart(event: any): void {
        event.preventDefault();
    }

    onPan(event: any): void {
        event.preventDefault();

        if (event.deltaY > 0 && this.value === true ) {
            this.value = false;
        }

        if (event.deltaY < 0 && this.value === false) {
            this.value = true;
        }

    }

}
