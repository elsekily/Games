import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent {
  @Input() sign: number[] = [];
  @Input() isClickable: boolean = true;

  toggle() {
    if (!this.isClickable) return;
    this.sign[0] = this.sign[0] == 1 ? 0 : 1;
  }

  getOpacity() : number {
    return this.sign[0] == 1 ?  1 : 0.2;
  }
}
