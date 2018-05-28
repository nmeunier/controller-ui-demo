import { Component, AfterViewInit, AfterContentInit, OnChanges, ViewChild, Input, ElementRef, EventEmitter } from '@angular/core';
import { FontLoaderService } from '../../font-loader.service';

@Component({
    selector: 'cui-classic-brake-gauge',
    templateUrl: './classic-brake-gauge.component.html',
    styleUrls: ['./classic-brake-gauge.component.css']
})
export class ClassicBrakeGaugeComponent implements AfterViewInit, AfterContentInit, OnChanges {

    @ViewChild('gauge') gauge: ElementRef;
    @ViewChild('gaugePointer') gaugePointer: ElementRef;
    @ViewChild('gaugeSecPointer') gaugeSecPointer: ElementRef;
    @ViewChild('gaugeContainer') gaugeContainer: ElementRef;
    @Input() maxGraduation: number;
    @Input() maxValue: number;
    @Input() value: number;
    @Input() maxSecValue: number;
    @Input() secValue: number;
    @Input() unit?: string;
    @Input() backgroundColor?: string;

    public canvasWH = 3000;
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
    private fontReady = false;
    private onFontReady: EventEmitter<boolean>;
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

    constructor(protected fontLoader: FontLoaderService) {

        this.onFontReady = new EventEmitter();
        this.fontLoader.load('Pathway Gothic One', 'google').then(() => {
            this.fontReady = true;
            this.onFontReady.emit(true);
        }).catch(() => {
            // Try to draw without font
            this.fontReady = true;
            this.onFontReady.emit(false);
        });

    }

    public setValue(_value) {

        let value = _value * 100;
        const ratio = this.maxValue / this.maxGraduation;

        if (value < 0) {
            value = 0;
        }

        if (value > 100) {
            value = 100;
        }

        const range = this.from - this.to;

        this.rotateValue = (value * ratio) * range / 100;

    }

    public setSecValue(_value) {

        let value = _value * 100;
        const ratio = this.maxSecValue / this.maxGraduation;

        if (value < 0) {
            value = 0;
        }

        if (value > 100) {
            value = 100;
        }

        const range = this.from - this.to;
        this.secRotateValue = (value * ratio) * range / 100;

    }

    ngOnChanges() {
        this.setValue(this.value);
        this.setSecValue(this.secValue);

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
        this.setValue(this.value);
        this.setSecValue(this.secValue);
        this.redraw();
    }

    private redraw() {

        if (this.fontReady) {
            this.drawContainer();
            this.drawZones();
            this.drawGraduations(50, 5);
            this.drawSpecialMainGraduations();
            this.drawPointers(this.secPointerCtx, '#CC0000');
            this.drawPointers(this.pointerCtx, '#000000');
        } else {
            this.onFontReady.subscribe(() => {
                this.redraw();
            });
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

    private drawGraduations(_gradNumber: number, _main: number) {

        _gradNumber = _gradNumber + 1;

        if (_gradNumber < 2) {
            throw new Error('Analog gauge can\'t have less than 2 graduation');
        }

        const useableRange = this.from - this.to;
        const rangePart = useableRange / (_gradNumber - 1);

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
        for (let i = 0; i < _gradNumber; i++) {

            let speedText = '';
            let style = 'normal';

            if (i % _main === 0) {
                style = 'main';
                speedText = (this.maxGraduation - ((this.maxGraduation * i) / (_gradNumber - 1))).toString();
            }

            if (i === _gradNumber - 1) {
                style = 'main';
                speedText = '0';
            }

            this.drawScale(this.to + (i * rangePart), style, speedText);
        }

    }

    private drawScale(_angle, _type: string, _speedText?: string) {

        const circleRadius = this.radius - this.outCircleWidth + 2;
        const secCircleRadius = this.radius - this.graduateLength - 2;
        const subCircleRadius = this.radius - (this.graduateLength / 2) + 2;
        const mainGraduateAngle = 2;

        switch (_type) {
            case 'normal':

                this.ctx.beginPath();
                this.ctx.lineWidth = 5;
                this.ctx.strokeStyle = '#000000';
                this.ctx.beginPath();
                this.ctx.moveTo(
                    this.radius + secCircleRadius * Math.sin((_angle * Math.PI / 180)),
                    this.radius + secCircleRadius * Math.cos((_angle * Math.PI / 180))
                );
                this.ctx.lineTo(
                    this.radius + subCircleRadius * Math.sin((_angle * Math.PI / 180)),
                    this.radius + subCircleRadius * Math.cos((_angle * Math.PI / 180))
                );
                this.ctx.stroke();

            break;
            case 'main':

                this.ctx.beginPath();
                this.ctx.lineWidth = 10;
                this.ctx.strokeStyle = '#000000';
                this.ctx.beginPath();
                this.ctx.moveTo(
                    this.radius + secCircleRadius * Math.sin((_angle * (Math.PI / 180))),
                    this.radius + secCircleRadius * Math.cos((_angle * (Math.PI / 180)))
                );
                this.ctx.lineTo(
                    this.radius + circleRadius * Math.sin((_angle * (Math.PI / 180))),
                    this.radius + circleRadius * Math.cos((_angle * (Math.PI / 180)))
                );
                this.ctx.stroke();

                this.setMainGraduationValue(_angle, _speedText);

            break;

        }
    }

    private setMainGraduationValue(_angle, _speedText) {

        if (_speedText % this.parityCheck === 0) {

            const circleRadius = this.radius - this.radius * 28 / 100;
            const fontSize = this.radius * 0.10;
            const textWidth = fontSize / 10 * 4 * 3;

            const topPos = this.radius + circleRadius * Math.cos((_angle * (Math.PI / 180))) + (fontSize / 2);
            const leftPos = this.radius + circleRadius * Math.sin((_angle * (Math.PI / 180)));

            this.ctx.font = fontSize + 'px Pathway Gothic One';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(_speedText, leftPos, topPos);

        }

    }

    private drawZones() {

        const zonesNames = Object.keys(this.zones);
        const circleRadius = this.radius - this.outCircleWidth;
        const outCircleRadius = this.radius - (this.graduateLength / 4) - 5;
        const inCircleRadius = this.radius - ((this.graduateLength / 4) * 3);
        const outLineWidth = this.graduateLength / 2 - 16;
        const inLineWidth = this.graduateLength / 2;

        for (let i = 0; i < zonesNames.length; i++) {

            const start = this.findAngleByValue(this.zones[zonesNames[i]][0]);
            const end = this.findAngleByValue(this.zones[zonesNames[i]][1]);
            const cireclePos = (this.zones[zonesNames[i]][2]) ? inCircleRadius : outCircleRadius;

            this.ctx.beginPath();
            this.ctx.strokeStyle = zonesNames[i];
            this.ctx.lineWidth = (this.zones[zonesNames[i]][2]) ? inLineWidth : outLineWidth;
            this.ctx.arc(circleRadius, circleRadius, cireclePos, start, end);
            this.ctx.stroke();
        }

    }

    private drawSpecialMainGraduations() {
        const mainGraduationColor = Object.keys(this.specialMainGraduations);
        const circleRadius = this.radius - this.outCircleWidth + 2;
        const secCircleRadius = this.radius - this.graduateLength - 2;

        for (let i = 0; i < mainGraduationColor.length; i++) {
            const angle = this.findAngleByValue(this.specialMainGraduations[mainGraduationColor[i]]);
            this.ctx.beginPath();
            this.ctx.lineWidth = 20;
            this.ctx.strokeStyle = mainGraduationColor[i];
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

    private findAngleByValue(_value) {
        const useableRange = this.from - this.to;
        const angle = (((_value * useableRange) / this.maxGraduation)  + this.to + 90) * (Math.PI / 180);
        return angle;
    }

    private drawPointers(_ctx, _color) {

        const pointerRadius = this.radius * 0.70;
        const pointerWidth = this.radius * 0.022;
        const backReport = pointerWidth * 2;
        const baseWidth = pointerWidth * 4;
        const baseLength = pointerWidth * 6;

        _ctx.beginPath();

        _ctx.moveTo(this.radius, this.radius);

        // Recule par rapport au centre
        const x = this.radius + backReport * Math.cos((this.from - 180) * (Math.PI / 180));
        const y = this.radius + backReport * Math.sin((this.from - 180) * (Math.PI / 180));
        _ctx.lineTo(y, x);

        // Vers le haut
        _ctx.lineTo(
            y + pointerWidth * Math.sin((this.from - 90) * (Math.PI / 180)),
            x + pointerWidth * Math.cos((this.from - 90) * (Math.PI / 180))
        );

        // Pointe
        _ctx.lineTo(
            this.radius + pointerRadius * Math.sin((this.from) * (Math.PI / 180)),
            this.radius + pointerRadius * Math.cos((this.from) * (Math.PI / 180))
        );

        // Vers le bas
        _ctx.lineTo(
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
        _ctx.quadraticCurveTo(
            yArcBAse + pointerWidth * Math.sin((this.from + 90) * (Math.PI / 180)),
            xArcBase + pointerWidth * Math.cos((this.from + 90) * (Math.PI / 180)),
            yBase + baseWidth * Math.sin((this.from + 90) * (Math.PI / 180)),
            xBase + baseWidth * Math.cos((this.from + 90) * (Math.PI / 180))
        );

        // Transversal base vers le haut
        _ctx.quadraticCurveTo(
            yBaseArc,
            xBaseArc,
            yBase + baseWidth * Math.sin((this.from - 90) * (Math.PI / 180)),
            xBase + baseWidth * Math.cos((this.from - 90) * (Math.PI / 180))
        );

        // Retour Vers le haut
        _ctx.quadraticCurveTo(
            yArcBAse + pointerWidth * Math.sin((this.from - 90) * (Math.PI / 180)),
            xArcBase + pointerWidth * Math.cos((this.from - 90) * (Math.PI / 180)),
            y + pointerWidth * Math.sin((this.from - 90) * (Math.PI / 180)),
            x + pointerWidth * Math.cos((this.from - 90) * (Math.PI / 180))
        );

        _ctx.closePath();
        _ctx.fillStyle = _color;
        _ctx.fill();

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

        _ctx.beginPath();
        _ctx.arc(this.radius, this.radius, pointerWidth * 3, 0, Math.PI * 2, true);
        _ctx.fillStyle = radgrad;
        _ctx.fill();

    }

}
