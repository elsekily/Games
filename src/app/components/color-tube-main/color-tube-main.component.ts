
import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { ColorTubeComponent } from './color-tube/color-tube.component';
import {  ColorsEnum } from 'src/app/models/colors';
import { Tube } from 'src/app/models/Tube';
import { Solver } from 'src/app/models/Solver';

@Component({
  selector: 'app-color-tube-main',
  templateUrl: './color-tube-main.component.html',
  styleUrls: ['./color-tube-main.component.css']
})
export class ColorTubeMainComponent{

  colorTubes: Tube[] = [];
  colors = ColorsEnum;
  selectedColor: string = ''; 
  canAddTubes: boolean = true;  
  maxTubes: number = 14;
  canRemoveTubes: boolean = false;
  
  Add() {
    if (!this.canAddTubes)
      return;

    this.colorTubes.push(new Tube());
    this.canRemoveTubes = true;

    if (this.colorTubes.length == this.maxTubes) {
      this.canAddTubes = false;
    }

  }
  Remove() {
    if (!this.canRemoveTubes)
      return;
    
    this.colorTubes.pop();
    this.canAddTubes = true;

    if (this.colorTubes.length == 0) {
      this.canRemoveTubes = false;
    }
  }

  insertColor(index: number) {
    if (index > this.colorTubes.length)
      return;

    if (this.selectedColor == '' && this.colorTubes[index].stack.length != 0) {
      this.colorTubes[index].stack.pop();
      return;
    }

    if (this.selectedColor == '' && this.colorTubes[index].stack.length == 0) {
      return;
    }

    this.colorTubes[index].add(this.selectedColor, 1);
  }

  async Solve() : Promise<void>{

    let solution = new Solver().Solve(this.colorTubes);
    //let solution = [[0, 2], [1, 0], [1, 2]];
    if (solution.length == 0)
      return;

    for (let index = 0; index < solution.length; index++) {
      console.log(this.colorTubes);
        await this.move(solution[index][0], solution[index][1]);
      
    }    
  }


  
  @ViewChildren(ColorTubeComponent, { read: ElementRef }) colorTubesEle!: QueryList<ElementRef>;

  async move(from:number,to:number) : Promise<void> {
    let elemnt = this.colorTubesEle.toArray()[from].nativeElement;

    var z = this.getPosition(from, to);

    elemnt.style.setProperty('--xPixels', z[0]);
    elemnt.style.setProperty('--yPixels', z[1]);
    elemnt.classList.add('move');

    this.colorTubes[to].add(this.colorTubes[from].getTopLayer(), this.colorTubes[from].getTopLayerCount());
    this.colorTubes[from].clear();

    await this.delay(1000);
      elemnt.style.removeProperty('--xPixels');
      elemnt.style.removeProperty('--yPixels');
      elemnt.classList.remove('move');
  }
  

  getPosition(from: number, to: number) {
    let list = this.colorTubesEle.toArray();

    let fromPosition = list[from].nativeElement.getBoundingClientRect();
    let toPosition = list[to].nativeElement.getBoundingClientRect();


    let xDiff = toPosition.x - fromPosition.x;
    let yDiff = toPosition.y - fromPosition.y;

    let result:string[] = ['', ''];

    if (yDiff > 0)
      result[1] = '150px';
    else if (yDiff < 0)
      result[1] = '-350px';
    else
      result[1] = '-100px';

    if (xDiff > 0)
      result[0] = `${xDiff-60}px`;
    else if(xDiff < 0)
      result[0] = `${xDiff - 60}px`;
    else
      result[0] = '-60px';
      
    

    return result;
  }

    delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



}