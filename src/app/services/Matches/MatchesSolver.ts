
import { Injectable } from "@angular/core";
import { MatchesUtitlies } from "./MatchesUtitlies";
import { Equation } from "src/app/models/Equation";

@Injectable({
  providedIn: 'any' 
})

export class MatchesSolver {
  constructor(private helper: MatchesUtitlies) { }
  
  private solution: Equation[] = [];
  private intialEquation!: Equation;
  


  public Solve(equation: Equation,matchesToMove : number): Equation[] { 
    if (!this.helper.isValidEquationNumbers(equation))
      return [];

    let newEquation = equation.clone();
    this.intialEquation = equation.clone();
    this.RemoveMatches(newEquation, matchesToMove, matchesToMove);

    
    return this.solution;
  }

  private RemoveMatches(equation: Equation, matchesToMove: number, avilableToMove: number) {
    let arrays = [equation.number1, equation.number2, equation.result];

    for (let index = 0; index < arrays.length; index++) {

      for (let i = 0; i < arrays[index].length; i++) {
      if (arrays[index][i] == 1) {
        avilableToMove--;
        arrays[index][i] = 0;
        
        if (avilableToMove == 0) {
          this.AddMatches(equation, matchesToMove, matchesToMove);
        }
        else {
          this.RemoveMatches(equation, matchesToMove,avilableToMove);
        }
        avilableToMove++;
        arrays[index][i] = 1;
      }
    }
    }
    if (equation.sign[0] == 1) {
      avilableToMove--;
      equation.sign[0] = 0;

        if (avilableToMove == 0) {
          this.AddMatches(equation, matchesToMove, matchesToMove);
        }
        else {
          this.RemoveMatches(equation, matchesToMove,avilableToMove);
        }
        avilableToMove++;
        equation.sign[0] = 1;
    }
  }

  private AddMatches(equation: Equation, matchesToMove: number, avilableToPlace: number) {
    let arrays = [equation.number1, equation.number2, equation.result];

    for (let index = 0; index < arrays.length; index++) {
      for (let i = 0; i < arrays[index].length; i++) {
      if (arrays[index][i] == 0) {
        avilableToPlace--;
        arrays[index][i] = 1;
        
        if (avilableToPlace == 0) {
          if (this.helper.isValidEquationNumbers(equation)
            && this.helper.isValidEquationResult(equation)
            && !this.helper.isEquationExist(this.solution, equation)
           && this.helper.getEquationDifference(equation, this.intialEquation)/2 === matchesToMove)
            this.solution.push(equation.clone());
        }
        else {
          this.AddMatches(equation, matchesToMove,avilableToPlace);
        }
        avilableToPlace++;
        arrays[index][i] = 0;
      }
    }
    }
    if (equation.sign[0] == 0) {
      avilableToPlace--;
      equation.sign[0] = 1;

        if (avilableToPlace == 0) {
          if (this.helper.isValidEquationResult(equation)
            && !this.helper.isEquationExist(this.solution, equation)
            && this.helper.getEquationDifference(equation, this.intialEquation)/2 === matchesToMove)
            this.solution.push(equation.clone());
        }
        else {
          this.AddMatches(equation, matchesToMove,avilableToPlace);
        }
        avilableToPlace++;
        equation.sign[0] = 0;
    }
  }
}