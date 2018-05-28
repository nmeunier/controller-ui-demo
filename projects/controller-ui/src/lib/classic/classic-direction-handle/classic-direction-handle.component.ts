import { Component, OnInit, AfterContentInit, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'cui-classic-direction-handle',
  templateUrl: './classic-direction-handle.component.html',
  styleUrls: ['./classic-direction-handle.component.css']
})
export class ClassicDirectionHandleComponent implements OnInit, AfterContentInit {
  private _value = 0;
  private _coefValue = 0;

  @ViewChild('ctrlDirectionCtn') ctrlDirectionCtn: ElementRef;
  @ViewChild('handle') handle: ElementRef;
  @Input()steps?;
  @Input()beginFrom?;
  @Input()graduations?: Array<string>;

  // Value two way binding
  @Output() valueChange = new EventEmitter();
  @Input()
  get value() {
      return this._value + this._coefValue;
  }

  set value(val: number) {

      val = (Math.round(val * 100) / 100) - this._coefValue;

      if (val !== this._value) {
          this._value = val;
          this.valueChange.emit(this._value + this._coefValue);
      }
  }

  private manipulatorCtx: CanvasRenderingContext2D;

  private x = 0;
  private y = 0;
  private startX = 0;
  private startY = 0;

  private angleValue = -28;
  private containerHeight = 0;
  private containerWidth = 0;
  private cursorHeight = 0;

  public handleHeight = 0;
  public handleWidth = 0;
  public handlePosX = 0;
  public handlePosY = 0;
  public handleRotateAxisX: number = this.handleWidth - (this.handleHeight / 2);
  public handleRotateAxisY: number = this.handleHeight / 2;

  public rotate = 0;

  @HostListener('window:resize', ['$event']) onResize(event) { this.applySize(); }

  constructor() { }

  ngOnInit() {

    if (this.beginFrom) {
      this._coefValue = Number.parseInt(this.beginFrom);
      this._value = this._value - this._coefValue;
    }

    this.valueChange.subscribe(() => {
      this.rotate = (this.angleValue * (this._value - 1));
    });

}

  ngAfterContentInit() {
    this.applySize();
  }

  private applySize() {

      const containerPos = this.ctrlDirectionCtn.nativeElement.getBoundingClientRect();

    if (containerPos.width < containerPos.height) {
      this.containerWidth = this.containerHeight = containerPos.width;
    } else {
      this.containerWidth = this.containerHeight = containerPos.height;
    }

    this.cursorHeight = this.containerWidth / 3;
    this.handleHeight = this.containerWidth / 3;
    this.handleWidth = this.containerWidth;
    this.handlePosY = this.containerWidth / 3;
    this.handleRotateAxisX = this.handleWidth - (this.handleHeight / 2);
    this.handleRotateAxisY = this.handleHeight / 2;
    this.y = this._value * this.cursorHeight;
    this.rotate = (this.angleValue * (this._value - 1));

  }

  onPanStart(event: any): void {
    event.preventDefault();
    this.startX = this.x;
    this.startY = this.y;
  }

  onPan(event: any): void {
    event.preventDefault();

    let newY = this.startY + event.deltaY;

    if (newY < 0) {
      newY = 0;
    }

    if (newY > (this.containerHeight - this.cursorHeight)) {
      newY = this.containerHeight - this.cursorHeight;
    }

    const currentStep = Math.round(newY / (this.containerHeight / this.steps));
    if (this._value !== currentStep) {
      this.y = currentStep * this.cursorHeight;
      this.value = currentStep + this._coefValue;
      this.rotate = (this.angleValue * (this._value - 1));
    }

  }

}
