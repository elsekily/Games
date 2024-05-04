import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { ColorTubeComponent } from './color-tube/color-tube.component';
import {  ColorsEnum } from 'src/app/models/colors';
import { Tube } from 'src/app/models/ColorTubes/Tube';
import { ColorTubeSolver } from "src/app/services/ColorTubeSolver";

@Component({
  selector: 'app-color-tube-main',
  templateUrl: './color-tube-main.component.html',
  styleUrls: ['./color-tube-main.component.css'],
  providers: [ColorTubeSolver] 
})
export class ColorTubeMainComponent{

  colorTubes: Tube[] = [];
  colors = ColorsEnum;
  selectedColor: string = ''; 
  canAddTubes: boolean = true;  
  maxTubes: number = 14;
  canRemoveTubes: boolean = false;
  canInsertColors: boolean = true;
  solvable: boolean = false;
  solved: boolean = false;
  solutionIndex : number = 0;
  solution: number[][] = [];


  constructor(private solver : ColorTubeSolver ) {
  }
  Add() {
    if (!this.canAddTubes)
      return;

    this.colorTubes.push(new Tube());
    this.canRemoveTubes = true;

    if (this.colorTubes.length == this.maxTubes) {
      this.canAddTubes = false;
    }

    this.checkValid();
  }
  Remove() {
    if (!this.canRemoveTubes)
      return;
    
    this.colorTubes.pop();
    this.canAddTubes = true;

    if (this.colorTubes.length == 0) {
      this.canRemoveTubes = false;
    }

    this.checkValid();
    
  }

  insertColor(index: number) {
    if (index > this.colorTubes.length || !this.canInsertColors)
      return;

    if (this.selectedColor == '' && this.colorTubes[index].GetCount() != 0) {

      this.colorTubes[index].RemoveOne();
      this.checkValid();
      return;
    }

    if (this.selectedColor == '' && this.colorTubes[index].GetCount() == 0) {
      
      return;
    }

    this.colorTubes[index].add(this.selectedColor, 1);
    this.checkValid();
  }

  async Solve(){

    this.solution =  this.solver.Solve(this.colorTubes);

    this.solvable = false;
    this.canAddTubes = false;
    this.canRemoveTubes = false;
    this.canInsertColors = false;

    if (this.solution.length == 0) {
      alert('No Solution');
      return;
    }

    this.solved = true;

    
  }

  async Next(): Promise<void> {
    if (this.solutionIndex >= this.solution.length)
      return;

    await this.move(this.solution[this.solutionIndex][0], this.solution[this.solutionIndex][1]);
    this.solutionIndex++;

    if (this.solutionIndex >= this.solution.length) this.solved = false;
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
  

  checkValid()  {
    this.solvable =  this.solver.IsValid(this.colorTubes);
  }



}
