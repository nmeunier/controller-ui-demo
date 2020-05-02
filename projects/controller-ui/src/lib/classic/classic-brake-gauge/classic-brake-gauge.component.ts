import { Component, AfterViewInit, AfterContentInit, OnChanges, ViewChild, Input, ElementRef } from '@angular/core';

@Component({
    selector: 'cui-classic-brake-gauge',
    templateUrl: './classic-brake-gauge.component.html',
    styleUrls: ['../../styles/font.css', './classic-brake-gauge.component.css']
})
export class ClassicBrakeGaugeComponent implements AfterViewInit, AfterContentInit, OnChanges {

    @ViewChild('gauge', {static: true}) gauge: ElementRef;
    @ViewChild('gaugePointer', {static: true}) gaugePointer: ElementRef;
    @ViewChild('gaugeSecPointer', {static: true}) gaugeSecPointer: ElementRef;
    @ViewChild('gaugeContainer', {static: true}) gaugeContainer: ElementRef;
    @Input() maxGraduation: number;
    @Input() maxValue: number;
    @Input() maxSecValue: number;
    @Input() unit?: string;
    @Input() backgroundColor?: string;

    @Input()
    get value() {
        return this.internalValue;
    }

    set value(val: number) {

        this.internalValue = val;
        let value = val * 100;
        const ratio = this.maxValue / this.maxGraduation;

        if (value < 0) {
            value = 0;
            this.internalValue = 0;
        }

        if (value > 100) {
            value = 100;
            this.internalValue = 1;
        }

        const range = this.from - this.to;
        this.rotateValue = (value * ratio) * range / 100;
        this.redraw();

    }


    @Input()
    get secValue() {
        return this.internalSecValue;
    }

    set secValue(val: number) {

        this.internalSecValue = val;
        let value = val * 100;
        const ratio = this.maxSecValue / this.maxGraduation;

        if (value < 0) {
            value = 0;
            this.internalSecValue = 0;
        }

        if (value > 100) {
            value = 100;
            this.internalSecValue = 1;
        }

        const range = this.from - this.to;
        this.secRotateValue = (value * ratio) * range / 100;
        this.redraw();

    }


    public canvasWH = 3000;
    private internalValue = 0;
    private internalSecValue = 0;
    private parityCheck = 200;
    private zones = {
        '#73a704': [340, 380, 0], // Zone definition => color:[start, end, (in/out)]
        '#ffb900': [380, 440, 0],
        '#04a6f1': [440, 481, 0],
        '#f25022': [690, 780, 1]
    };
    private specialMainGraduations = {
        '#f25022': 488
    };
    private radius: number = this.canvasWH / 2;
    private outCircleWidth = 5; // Gauge border
    private graduateShadow = 5; // Shadow between graduation and gauge center
    private graduateLength = this.radius * 16 / 100;
    private originalMaxGraduation = this.maxGraduation;
    private originalUnit = this.unit;
    private originalMaxValue = this.maxValue;
    private originalMaxSecValue = this.maxSecValue;

    // Graduation Angle
    private to = 65;
    private from = 295;
    public rotateValue = 0;
    public secRotateValue = 0;

    private ctx: CanvasRenderingContext2D;
    private pointerCtx: CanvasRenderingContext2D;
    private secPointerCtx: CanvasRenderingContext2D;

    constructor() { }


    ngOnChanges() {
        if ( this.originalMaxGraduation !== this.maxGraduation
            || this.originalUnit !== this.unit
            || this.originalMaxValue !== this.maxValue
            || this.originalMaxSecValue !== this.maxSecValue
        ) {
            this.originalMaxGraduation = this.maxGraduation;
            this.originalUnit = this.unit;
            this.originalMaxValue = this.maxValue;
            this.originalMaxSecValue = this.maxSecValue;
            this.redraw();
        }
    }

    ngAfterContentInit() {
        this.ctx = this.gauge.nativeElement.getContext('2d');
        this.pointerCtx = this.gaugePointer.nativeElement.getContext('2d');
        this.secPointerCtx = this.gaugeSecPointer.nativeElement.getContext('2d');
    }

    ngAfterViewInit() {
        this.redraw();
    }

    private redraw() {

        if (this.ctx) {
            this.drawContainer();
            this.drawZones();
            this.drawGraduations(50, 5);
            this.drawSpecialMainGraduations();
            this.drawPointers(this.secPointerCtx, '#CC0000');
            this.drawPointers(this.pointerCtx, '#000000');
        }

    }

    private drawContainer() {

        const circleRadius = this.radius - this.outCircleWidth;

        this.ctx.beginPath();
        this.ctx.arc(this.radius, this.radius, circleRadius, 0, Math.PI * 2, true);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = this.outCircleWidth;
        this.ctx.fill();
        this.ctx.stroke();

        const topPos = ((this.radius / 2) * 2.8 + (this.radius * 0.10));
        const leftPos = (this.radius * 1.63);

        this.ctx.font = (this.radius * 0.10) + 'px Pathway Gothic One';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = '#000000';
        this.ctx.fillText(this.unit || 'kPa', leftPos, topPos);

    }

    private drawGraduations(gradNumber: number, main: number) {

        gradNumber = gradNumber + 1;

        if (gradNumber < 2) {
            throw new Error('Analog gauge can\'t have less than 2 graduation');
        }

        const useableRange = this.from - this.to;
        const rangePart = useableRange / (gradNumber - 1);

        const circleRadius = this.radius - this.outCircleWidth;
        const secCircleRadius = this.radius - this.graduateLength;
        const subCircleRadius = this.radius - (this.graduateLength / 2);

        this.ctx.beginPath();
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 5;
        this.ctx.arc(circleRadius, circleRadius, secCircleRadius, ((this.to + 90) * (Math.PI / 180)), ((this.from + 90) * (Math.PI / 180)));
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 5;
        this.ctx.arc(circleRadius, circleRadius, subCircleRadius, ((this.to + 90) * (Math.PI / 180)), ((this.from + 90) * (Math.PI / 180)));
        this.ctx.stroke();

        const current = this.to;
        for (let i = 0; i < gradNumber; i++) {

            let speedText = '';
            let style = 'normal';

            if (i % main === 0) {
                style = 'main';
                speedText = (this.maxGraduation - ((this.maxGraduation * i) / (gradNumber - 1))).toString();
            }

            if (i === gradNumber - 1) {
                style = 'main';
                speedText = '0';
            }

            this.drawScale(this.to + (i * rangePart), style, speedText);
        }

    }

    private drawScale(angle, type: string, speedText?: string) {

        const circleRadius = this.radius - this.outCircleWidth + 2;
        const secCircleRadius = this.radius - this.graduateLength - 2;
        const subCircleRadius = this.radius - (this.graduateLength / 2) + 2;

        switch (type) {
            case 'normal':

                this.ctx.beginPath();
                this.ctx.lineWidth = 5;
                this.ctx.strokeStyle = '#000000';
                this.ctx.beginPath();
                this.ctx.moveTo(
                    this.radius + secCircleRadius * Math.sin((angle * Math.PI / 180)),
                    this.radius + secCircleRadius * Math.cos((angle * Math.PI / 180))
                );
                this.ctx.lineTo(
                    this.radius + subCircleRadius * Math.sin((angle * Math.PI / 180)),
                    this.radius + subCircleRadius * Math.cos((angle * Math.PI / 180))
                );
                this.ctx.stroke();

                break;
            case 'main':

                this.ctx.beginPath();
                this.ctx.lineWidth = 10;
                this.ctx.strokeStyle = '#000000';
                this.ctx.beginPath();
                this.ctx.moveTo(
                    this.radius + secCircleRadius * Math.sin((angle * (Math.PI / 180))),
                    this.radius + secCircleRadius * Math.cos((angle * (Math.PI / 180)))
                );
                this.ctx.lineTo(
                    this.radius + circleRadius * Math.sin((angle * (Math.PI / 180))),
                    this.radius + circleRadius * Math.cos((angle * (Math.PI / 180)))
                );
                this.ctx.stroke();

                this.setMainGraduationValue(angle, speedText);

                break;

        }
    }

    private setMainGraduationValue(angle, speedText) {

        if (speedText % this.parityCheck === 0) {

            const circleRadius = this.radius - this.radius * 28 / 100;
            const fontSize = this.radius * 0.10;
            const textWidth = fontSize / 10 * 4 * 3;

            const topPos = this.radius + circleRadius * Math.cos((angle * (Math.PI / 180))) + (fontSize / 2);
            const leftPos = this.radius + circleRadius * Math.sin((angle * (Math.PI / 180)));

            this.ctx.font = fontSize + 'px Pathway Gothic One';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(speedText, leftPos, topPos);

        }

    }

    private drawZones() {

        const zonesNames = Object.keys(this.zones);
        const circleRadius = this.radius - this.outCircleWidth;
        const outCircleRadius = this.radius - (this.graduateLength / 4) - 5;
        const inCircleRadius = this.radius - ((this.graduateLength / 4) * 3);
        const outLineWidth = this.graduateLength / 2 - 16;
        const inLineWidth = this.graduateLength / 2;

        for (const zone of zonesNames) {

            const start = this.findAngleByValue(this.zones[zone][0]);
            const end = this.findAngleByValue(this.zones[zone][1]);
            const cireclePos = (this.zones[zone][2]) ? inCircleRadius : outCircleRadius;

            this.ctx.beginPath();
            this.ctx.strokeStyle = zone;
            this.ctx.lineWidth = (this.zones[zone][2]) ? inLineWidth : outLineWidth;
            this.ctx.arc(circleRadius, circleRadius, cireclePos, start, end);
            this.ctx.stroke();
        }

    }

    private drawSpecialMainGraduations() {
        const mainGraduationColor = Object.keys(this.specialMainGraduations);
        const circleRadius = this.radius - this.outCircleWidth + 2;
        const secCircleRadius = this.radius - this.graduateLength - 2;

        for (const colorZone of mainGraduationColor) {
            const angle = this.findAngleByValue(this.specialMainGraduations[colorZone]);
            this.ctx.beginPath();
            this.ctx.lineWidth = 20;
            this.ctx.strokeStyle = colorZone;
            this.ctx.beginPath();
            this.ctx.moveTo(
                this.radius - secCircleRadius * Math.sin((angle * (Math.PI / 180))),
                this.radius - secCircleRadius * Math.cos((angle * (Math.PI / 180)))
            );
            this.ctx.lineTo(
                this.radius - circleRadius * Math.sin((angle * (Math.PI / 180))),
                this.radius - circleRadius * Math.cos((angle * (Math.PI / 180)))
            );
            this.ctx.stroke();
        }
    }

    private findAngleByValue(value) {
        const useableRange = this.from - this.to;
        const angle = (((value * useableRange) / this.maxGraduation)  + this.to + 90) * (Math.PI / 180);
        return angle;
    }

    private drawPointers(ctx, color) {

        const pointerRadius = this.radius * 0.70;
        const pointerWidth = this.radius * 0.022;
        const backReport = pointerWidth * 2;
        const baseWidth = pointerWidth * 4;
        const baseLength = pointerWidth * 6;

        ctx.beginPath();

        ctx.moveTo(this.radius, this.radius);

        // Recule par rapport au centre
        const x = this.radius + backReport * Math.cos((this.from - 180) * (Math.PI / 180));
        const y = this.radius + backReport * Math.sin((this.from - 180) * (Math.PI / 180));
        ctx.lineTo(y, x);

        // Vers le haut
        ctx.lineTo(
            y + pointerWidth * Math.sin((this.from - 90) * (Math.PI / 180)),
            x + pointerWidth * Math.cos((this.from - 90) * (Math.PI / 180))
        );

        // Pointe
        ctx.lineTo(
            this.radius + pointerRadius * Math.sin((this.from) * (Math.PI / 180)),
            this.radius + pointerRadius * Math.cos((this.from) * (Math.PI / 180))
        );

        // Vers le bas
        ctx.lineTo(
            y + pointerWidth * Math.sin((this.from + 90) * (Math.PI / 180)),
            x + pointerWidth * Math.cos((this.from + 90) * (Math.PI / 180))
        );

        // Base bas centre
        const xBase = this.radius + (backReport + baseLength) * Math.cos((this.from - 180) * (Math.PI / 180));
        const yBase = this.radius + (backReport + baseLength) * Math.sin((this.from - 180) * (Math.PI / 180));
        const xBaseArc = this.radius + (backReport + (baseLength * 1.5)) * Math.cos((this.from - 180) * (Math.PI / 180));
        const yBaseArc = this.radius + (backReport + (baseLength * 1.5)) * Math.sin((this.from - 180) * (Math.PI / 180));

        // Recul pour arc de la base
        const xArcBase = this.radius  + (backReport + (baseLength * 0.75)) * Math.cos((this.from - 180) * (Math.PI / 180));
        const yArcBAse = this.radius  + (backReport + (baseLength * 0.75)) * Math.sin((this.from - 180) * (Math.PI / 180));

        // Vers le bas
        ctx.quadraticCurveTo(
            yArcBAse + pointerWidth * Math.sin((this.from + 90) * (Math.PI / 180)),
            xArcBase + pointerWidth * Math.cos((this.from + 90) * (Math.PI / 180)),
            yBase + baseWidth * Math.sin((this.from + 90) * (Math.PI / 180)),
            xBase + baseWidth * Math.cos((this.from + 90) * (Math.PI / 180))
        );

        // Transversal base vers le haut
        ctx.quadraticCurveTo(
            yBaseArc,
            xBaseArc,
            yBase + baseWidth * Math.sin((this.from - 90) * (Math.PI / 180)),
            xBase + baseWidth * Math.cos((this.from - 90) * (Math.PI / 180))
        );

        // Retour Vers le haut
        ctx.quadraticCurveTo(
            yArcBAse + pointerWidth * Math.sin((this.from - 90) * (Math.PI / 180)),
            xArcBase + pointerWidth * Math.cos((this.from - 90) * (Math.PI / 180)),
            y + pointerWidth * Math.sin((this.from - 90) * (Math.PI / 180)),
            x + pointerWidth * Math.cos((this.from - 90) * (Math.PI / 180))
        );

        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();

        const radgrad = this.ctx.createRadialGradient(
            this.radius,
            this.radius,
            (pointerWidth * 3) - 5, this.radius,
            this.radius,
            (pointerWidth * 3) - 5 + this.graduateShadow
        );
        radgrad.addColorStop(0, '#ccc');
        radgrad.addColorStop(1, '#666');
        radgrad.addColorStop(1, '#fff');

        ctx.beginPath();
        ctx.arc(this.radius, this.radius, pointerWidth * 3, 0, Math.PI * 2, true);
        ctx.fillStyle = radgrad;
        ctx.fill();

    }

}
