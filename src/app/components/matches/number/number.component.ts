import { transition } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css']
})
export class NumberComponent {
   @Input()
  numberArray: number[] = [];

  getOpacity(i: number): number {
    if (i < 0 || i == this.numberArray.length) return 0;

    return this.numberArray[i] == 0 ? 0.2 : 1;
  }
  toggle(i: number) {
    if (i < 0 || i >= this.numberArray.length) return;

    this.numberArray[i] = this.numberArray[i] == 0 ? 1 : 0;
  }
}
