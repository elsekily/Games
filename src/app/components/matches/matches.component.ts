import { MatchesSolver } from './../../services/Matches/MatchesSolver';
import { MatchesUtitlies } from "src/app/services/Matches/MatchesUtitlies";
import { Component } from '@angular/core';
import { Equation } from 'src/app/models/Equation';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
  providers: [MatchesSolver] 
})
export class MatchesComponent {
  isSolved: boolean = false;
  equation: Equation;
  solution: Equation[] = [];
  solutionIndex: number = 0;
  
  selectedNumber!: number;
  numberOfMatchesToMove: number[] = [1, 2];
  
  


  solve() { 
  }

  change() {
    this.solutionIndex++;
    if (this.solutionIndex == this.solution.length)
      this.solutionIndex = 0;
  }

}