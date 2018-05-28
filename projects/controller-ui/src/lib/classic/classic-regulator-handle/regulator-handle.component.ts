import { Component, AfterViewInit, AfterContentInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'cui-regulator-handle',
    templateUrl: './regulator-handle.component.html',
    styleUrls: ['./regulator-handle.component.css']
})
export class RegulatorHandleComponent implements AfterContentInit, AfterViewInit {

    @ViewChild('handleCanvas') handle: ElementRef;

    private handleCtx: CanvasRenderingContext2D;
    public handleWidth = 550;
    public handleHeight = 200;

    constructor(private el: ElementRef) { }

    ngAfterContentInit() {
        this.handleCtx = this.handle.nativeElement.getContext('2d');
    }

    ngAfterViewInit() {
        this.drawHandle();
    }

    drawHandle() {

        const radius = this.handleHeight / 2;
        let radgrad = this.handleCtx.createRadialGradient(
            this.handleWidth - radius,
            radius + radius * 0.75,
            radius * 0.75 * 2,
            this.handleWidth - radius,
            radius + radius * 0.75,
            0
        );

        // Pointer
        this.handleCtx.beginPath();
        this.handleCtx.moveTo(this.handleWidth - radius, radius + radius * 0.75 - (radius / 10));
        this.handleCtx.lineTo(this.handleWidth - radius + ((radius / 5)), radius + radius * 0.75 - (radius / 10));
        this.handleCtx.lineTo(this.handleWidth - radius, radius + radius * 0.75 + (radius / 5));
        this.handleCtx.closePath();
        this.handleCtx.fillStyle = '#d1d1d1';
        this.handleCtx.fill();
        this.handleCtx.beginPath();
        this.handleCtx.moveTo(this.handleWidth - radius, radius + radius * 0.75 - (radius / 10));
        this.handleCtx.lineTo(this.handleWidth - radius - ((radius / 5)), radius + radius * 0.75 - (radius / 10));
        this.handleCtx.lineTo(this.handleWidth - radius, radius + radius * 0.75 + (radius / 5));
        this.handleCtx.closePath();
        this.handleCtx.fillStyle = '#8f8f8f';
        this.handleCtx.fill();

        // Bases circle
        radgrad.addColorStop(0, '#8f8f8f');
        radgrad.addColorStop(0.1, '#eee');
        radgrad.addColorStop(0.2, '#aeaeae');
        radgrad.addColorStop(1, '#8f8f8f');

        this.handleCtx.beginPath();
        this.handleCtx.arc((this.handleWidth - radius), radius, radius * 0.75, 0, Math.PI * 2, true);
        this.handleCtx.fillStyle = radgrad;
        this.handleCtx.fill();
        // rect
        const linGrad = this.handleCtx.createLinearGradient(
            radius,
            (this.handleHeight - (radius * 0.75 * 2)) / 2,
            radius,
            radius + radius * 0.75
        );
        linGrad.addColorStop(0, '#8f8f8f');
        linGrad.addColorStop(0.1, '#eee');
        linGrad.addColorStop(0.2, '#aeaeae');
        linGrad.addColorStop(1, '#8f8f8f');
        this.handleCtx.fillStyle = linGrad;
        this.handleCtx.fillRect(radius, (this.handleHeight - (radius * 0.75 * 2)) / 2, this.handleWidth - radius * 2, radius * 0.75 * 2);

        // Extremity circle
        radgrad = this.handleCtx.createRadialGradient(radius * 0.75, radius * 0.75, radius * 1.2, radius * 0.75, radius * 0.75, 0);
        radgrad.addColorStop(0, '#000');
        radgrad.addColorStop(0.6, '#000');
        radgrad.addColorStop(0.9, '#fff');
        radgrad.addColorStop(1, '#fff');

        this.handleCtx.beginPath();
        this.handleCtx.arc(radius, radius, radius, 0, Math.PI * 2, true);
        this.handleCtx.fillStyle = radgrad;
        this.handleCtx.fill();

    }

}
