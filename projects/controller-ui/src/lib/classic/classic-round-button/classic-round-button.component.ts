import { Component, AfterContentInit, OnChanges, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ColorManipulation } from '../../utils/color-manipulation';

@Component({
  selector: 'cui-classic-round-button',
  templateUrl: './classic-round-button.component.html',
  styleUrls: ['./classic-round-button.component.css']
})
export class ClassicRoundButtonComponent implements AfterContentInit, OnChanges {

  @ViewChild('buttonCtn', {static: true}) buttonCtn!: ElementRef;

  @Input() color!: string;
  @Output() press = new EventEmitter();

  public buttonSize = 100;
  public shadow = '';
  public iconColor = '';

  constructor() {

  }

  ngAfterContentInit(): void {
      this.redraw();
  }

  ngOnChanges(): void {
    this.redraw();
}

  public resize(): void {
      this.redraw();
  }

  private redraw(): void {

      const containerPos = this.buttonCtn.nativeElement.getBoundingClientRect();

      let refSize = 0;
      if (containerPos.width < containerPos.height) {
        refSize = containerPos.width;
      } else {
        refSize = containerPos.height;
      }

      // Romove padding;
      this.buttonSize = refSize - 20;
      this.iconColor = ColorManipulation.getColorText(this.color);

      const color10 = ColorManipulation.colorLightDark(this.color, 10);
      const color40 = ColorManipulation.colorLightDark(this.color, 40, 0.17);
      this.shadow = `0 -2px 0 3px ${color10} inset, 0 5px 5px ${color40}, 0 15px rgba(255, 255, 255, 0.25) inset`;
      console.log(this.shadow);

  }

}
