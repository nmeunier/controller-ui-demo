import { Component, ViewChild, Input, ElementRef, AfterViewInit, AfterContentInit, OnChanges } from '@angular/core';


@Component({
  selector: 'cui-classic-speed-gauge',
  templateUrl: './classic-speed-gauge.component.html',
  styleUrls: ['../../styles/font.css', './classic-speed-gauge.component.css']
})
export class ClassicSpeedGaugeComponent implements AfterViewInit, AfterContentInit, OnChanges {
    @ViewChild('gauge', {static: true}) gauge: ElementRef;
    @ViewChild('gaugePointer', {static: true}) gaugePointer: ElementRef;
    @ViewChild('gaugeContainer', {static: true}) gaugeContainer: ElementRef;
    @Input() maxSpeed: number;
    @Input() unit?: string;

    @Input()
    get value() {
        return this.internalValue;
    }

    set value(value: number) {

      this.internalValue = value;
      value = value * 100;

      if (value < 0) {
          value = 0;
          this.internalValue = 0;
      }

      if (value > 100) {
          value = 100;
          this.internalValue = 1;
      }

      const range = this.from - this.to;
      this.rotateValue = value * range / 100;
      this.redraw();

    }

    private internalValue = 0;
    public canvasWH = 800;
    private radius: number = this.canvasWH / 2;
    private outCircleWidth = 2; // Gauge border
    private graduateShadow = 5; // Shadow between graduation and gauge center
    private graduateLength = this.radius * 16 / 100;
    private originalMaxSpeed = this.maxSpeed;
    private originalUnit = this.unit;

    // Graduation Angle
    private to = 65;
    private from = 295;
    public rotateValue = 0;

    private ctx: CanvasRenderingContext2D;
    private pointerCtx: CanvasRenderingContext2D;

    constructor() { }


    ngOnChanges() {
      if ( this.unit !== this.originalUnit || this.maxSpeed !== this.originalMaxSpeed ) {
            this.originalUnit = this.unit;
            this.originalMaxSpeed = this.maxSpeed;
            this.redraw();
        }
    }

    ngAfterContentInit() {
        this.ctx = this.gauge.nativeElement.getContext('2d');
        this.pointerCtx = this.gaugePointer.nativeElement.getContext('2d');
    }

    ngAfterViewInit() {
      this.redraw();
    }

    private redraw() {
        this.drawContainer();
        this.drawPointer();
        this.drawGraduations(this.maxSpeed / 2, 10, 5);
        this.drawText();
    }

    private drawContainer() {

        if (! this.ctx) {
          return;
        }

        const circleRadius = this.radius - this.outCircleWidth;

        const innerCircleRadius = circleRadius - this.graduateLength - this.graduateShadow;
        const radgrad = this.ctx.createRadialGradient(
          this.radius,
          this.radius,
          innerCircleRadius,
          this.radius,
          this.radius,
          innerCircleRadius + this.graduateShadow
        );
        radgrad.addColorStop(0, '#fff');
        radgrad.addColorStop(0.9, '#999');
        radgrad.addColorStop(1, '#fff');

        this.ctx.beginPath();
        this.ctx.arc(this.radius, this.radius, circleRadius, 0, Math.PI * 2, true);
        this.ctx.fillStyle = radgrad;
        this.ctx.lineWidth = this.outCircleWidth;
        this.ctx.fill();
        this.ctx.stroke();

    }

    private drawText() {

      if (! this.ctx) {
        return;
      }

      const topPos = ((this.radius / 2) * 3 + (this.radius * 0.10));
      const leftPos = (this.radius);

      this.ctx.font = (this.radius * 0.24) + 'px Pathway Gothic One';
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = '#000000';
      this.ctx.fillText(this.unit || 'km/h', leftPos, topPos);
    }

    private drawPointer() {

      if (! this.ctx) {
        return;
      }

      const circleRadius = this.radius - this.outCircleWidth - this.graduateLength - this.graduateShadow;
      let pointer;
      const pointerWidth = pointer = this.radius * 0.048;

      this.pointerCtx.beginPath();
      this.pointerCtx.strokeStyle = '#CC0000';

      this.pointerCtx.moveTo(
          this.radius + (pointerWidth - 2) * Math.sin(((this.from - 90) * (Math.PI / 180))),
          this.radius + (pointerWidth - 2) * Math.cos(((this.from - 90) * (Math.PI / 180)))
        );
      this.pointerCtx.lineTo(
          this.radius + (pointerWidth - 2) * Math.sin(((this.from + 90) * (Math.PI / 180))),
          this.radius + (pointerWidth - 2) * Math.cos(((this.from + 90) * (Math.PI / 180)))
        );
      this.pointerCtx.lineTo(
          this.radius + (circleRadius - pointer) * Math.sin(((this.from + 1.5) * (Math.PI / 180))),
          this.radius + (circleRadius - pointer) * Math.cos(((this.from + 1.5) * (Math.PI / 180)))
        );
      this.pointerCtx.lineTo(
          this.radius + circleRadius * Math.sin((this.from * (Math.PI / 180))),
          this.radius + circleRadius * Math.cos((this.from * (Math.PI / 180)))
        );
      this.pointerCtx.lineTo(
          this.radius + (circleRadius - pointer) * Math.sin(((this.from - 1.5) * (Math.PI / 180))),
          this.radius + (circleRadius - pointer) * Math.cos(((this.from - 1.5) * (Math.PI / 180)))
        );
      this.pointerCtx.closePath();

      const gradient = this.pointerCtx.createLinearGradient(
          this.radius + (pointerWidth - 2) * Math.sin(((this.from - 90) * (Math.PI / 180))),
          this.radius + (pointerWidth - 2) * Math.cos(((this.from - 90) * (Math.PI / 180))),
          this.radius + (pointerWidth - 2) * Math.sin(((this.from + 90) * (Math.PI / 180))),
          this.radius + (pointerWidth - 2) * Math.cos(((this.from + 90) * (Math.PI / 180)))
        );
      gradient.addColorStop(0.1, 'black');
      gradient.addColorStop(0.5, '#777');
      gradient.addColorStop(0.9, 'black');
      this.pointerCtx.fillStyle = gradient;

      this.pointerCtx.fill();

      const radgrad = this.ctx.createRadialGradient(
          this.radius,
          this.radius, (this.radius / 3) - 5,
          this.radius,
          this.radius,
          (this.radius / 3) - 5 + this.graduateShadow
        );
      radgrad.addColorStop(0, '#ccc');
      radgrad.addColorStop(1, '#666');
        // radgrad.addColorStop(1, '#fff');

      this.pointerCtx.beginPath();
      this.pointerCtx.arc(this.radius, this.radius, this.radius / 3, 0, Math.PI * 2, true);
      this.pointerCtx.fillStyle = radgrad;
      this.pointerCtx.fill();

    }

    private drawGraduations(gradNumber: number, main: number, sub: number) {

        gradNumber = gradNumber + 1;

        if (gradNumber < 2) {
            throw new Error('Analog gauge can\'t have less than 2 graduation');
        }

        const useableRange = this.from - this.to;
        const rangePart = useableRange / (gradNumber - 1);

        for (let i = 0; i < gradNumber; i++) {

            let speedText = '';
            let style = 'normal';

            if (i % sub === 0) {
                style = 'sub';
            }

            if (i % main === 0) {
                style = 'main';
                speedText = (this.maxSpeed - ((this.maxSpeed * i) / (gradNumber - 1))).toString();
            }

            if (i === gradNumber - 1) {
                style = 'main';
                speedText = '0';
            }

            this.drawScale(this.to + (i * rangePart), style, speedText);
        }

    }

    private drawScale(angle, type: string, speedText?: string) {

      if (! this.ctx) {
        return;
      }

      const circleRadius = this.radius - this.outCircleWidth;
      const secCircleRadius = this.radius - this.graduateLength;
      const mainGraduateAngle = 2;

      switch (type) {
            case 'normal':

                this.ctx.beginPath();
                this.ctx.lineWidth = 1;
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

                break;
            case 'sub':

                this.ctx.beginPath();
                this.ctx.lineWidth = 3;
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

                break;
            case 'main':

                this.ctx.beginPath();
                this.ctx.fillStyle = '#000000';
                this.ctx.moveTo(
                  this.radius + secCircleRadius * Math.sin((angle * (Math.PI / 180))),
                  this.radius + secCircleRadius * Math.cos((angle * (Math.PI / 180)))
                );
                this.ctx.lineTo(
                  this.radius + circleRadius * Math.sin(((angle + (mainGraduateAngle / 2)) * (Math.PI / 180))),
                  this.radius + circleRadius * Math.cos(((angle + (mainGraduateAngle / 2)) * (Math.PI / 180)))
                );
                this.ctx.lineTo(
                  this.radius + circleRadius * Math.sin(((angle - (mainGraduateAngle / 2)) * (Math.PI / 180))),
                  this.radius + circleRadius * Math.cos(((angle - (mainGraduateAngle / 2)) * (Math.PI / 180)))
                );
                this.ctx.closePath();
                this.ctx.fill();

                this.setMainGraduationValue(angle, speedText);

                break;

        }
    }

    private setMainGraduationValue(angle, speedText) {

        const circleRadius = this.radius - this.radius * 34 / 100;
        const fontSize = this.radius * 0.16;

        const topPos = this.radius + circleRadius * Math.cos((angle * (Math.PI / 180))) + (fontSize / 2);
        const leftPos = this.radius + circleRadius * Math.sin((angle * (Math.PI / 180)));

        this.ctx.font = fontSize + 'px Pathway Gothic One';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(speedText, leftPos, topPos);

    }

}

