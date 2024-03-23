import { Component, Input } from '@angular/core';
import { Tube } from 'src/app/models/Tube';

@Component({
  selector: 'app-color-tube',
  templateUrl: './color-tube.component.html',
  styleUrls: ['./color-tube.component.css']
})
export class ColorTubeComponent {
  stack: string[] = [];
  @Input() childObject: Tube = new Tube();

  Add(color:string) {
    this.stack.push(color);
  }
  remove() {
    this.stack.pop();
  }

}
