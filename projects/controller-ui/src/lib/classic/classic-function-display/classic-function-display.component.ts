import { Component, AfterContentInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'cui-classic-function-display',
  templateUrl: './classic-function-display.component.html',
  styleUrls: ['./classic-function-display.component.css']
})
export class ClassicFunctionDisplayComponent implements AfterContentInit {

    @ViewChild('functionCtn') functionCtn: ElementRef;
    @Input() functions: Array<any>;

    private containerSizeRef = 0;

    public itemSize = 0;
    public iconSize = 0;
    public textSize = 0;
    public format = 'portrait';

    constructor() {

    }

    ngAfterContentInit() {
        this.redraw();
    }

    public resize() {
        this.redraw();
    }

    private redraw() {

        const containerPos = this.functionCtn.nativeElement.getBoundingClientRect();
        let ratio = 2;

        if (containerPos.width < containerPos.height) {
            this.containerSizeRef = containerPos.width;
            this.format = 'portrait';
            ratio = 3;
        } else {
            this.containerSizeRef = containerPos.height;
            this.format = 'landscape';
        }

        this.itemSize = this.containerSizeRef / ratio;
        this.iconSize = this.itemSize / 1.6;
    }

}
