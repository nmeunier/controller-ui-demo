import { Component, AfterContentInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'cui-direction-handle',
    templateUrl: './direction-handle.component.html',
    styleUrls: ['./direction-handle.component.css']
})
export class DirectionHandleComponent implements AfterContentInit, AfterViewInit {

    @ViewChild('handleCanvas', {static: true}) handle!: ElementRef;

    private handleCtx!: CanvasRenderingContext2D;
    public handleWidth = 600;
    public handleHeight = 200;

    constructor() { }

    ngAfterContentInit(): void {
        this.handleCtx = this.handle.nativeElement.getContext('2d');
    }

    ngAfterViewInit(): void {
        this.drawHandle();
    }

    drawHandle(): void {

        // Bases circle
        const radius = this.handleHeight / 2;
        let radgrad = this.handleCtx.createRadialGradient(this.handleWidth - radius, radius, radius, this.handleWidth - radius, radius, 0);
        radgrad.addColorStop(0, '#8f8f8f');
        radgrad.addColorStop(0.4, '#eee');
        radgrad.addColorStop(0.5, '#aeaeae');
        radgrad.addColorStop(1, '#8f8f8f');

        this.handleCtx.beginPath();
        this.handleCtx.arc(this.handleWidth - radius, radius, radius, 0, Math.PI * 2, true);
        this.handleCtx.fillStyle = radgrad;
        this.handleCtx.fill();

        // Cylinder

        // Rounded extremity
        const c = Math.sqrt(Math.pow((radius * 0.75), 2) - Math.pow((radius * 0.3), 2));
        const a = this.handleWidth - (radius + (radius * 0.75) + ((radius * 0.75) - c) * 1.75);
        const b = this.handleWidth - (radius + c);

        const linGrad = this.handleCtx.createLinearGradient(0, this.handleWidth / 8.5, 0, this.handleWidth / 4.6);
        linGrad.addColorStop(0, '#8f8f8f');
        linGrad.addColorStop(0.3, '#fff');
        linGrad.addColorStop(1, '#8f8f8f');
        this.handleCtx.beginPath();
        this.handleCtx.fillStyle = linGrad;
        this.handleCtx.moveTo(radius / 2, radius + (radius * 0.3));
        this.handleCtx.lineTo(b, radius + (radius * 0.3));

        this.handleCtx.quadraticCurveTo(a, radius, b, radius - (radius * 0.3));
        this.handleCtx.lineTo(radius / 2, radius - (radius * 0.3));
        this.handleCtx.closePath();
        this.handleCtx.fill();

        // Extremity circle
        radgrad = this.handleCtx.createRadialGradient(
            this.handleWidth / 7.5,
            this.handleWidth / 7.5,
            this.handleWidth / 6,
            this.handleWidth / 7.5,
            this.handleWidth / 7.5,
            0
        );
        radgrad.addColorStop(0, '#000');
        radgrad.addColorStop(0.6, '#000');
        radgrad.addColorStop(0.9, '#fff');
        radgrad.addColorStop(1, '#fff');

        this.handleCtx.beginPath();
        this.handleCtx.arc((radius * 0.75), radius, (radius * 0.75), 0, Math.PI * 2, true);
        this.handleCtx.fillStyle = radgrad;
        this.handleCtx.fill();

    }

}

