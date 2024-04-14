import { Injectable } from "@angular/core";
import { Equation } from "src/app/models/Equation";

@Injectable({
  providedIn: 'any' 
})


export class MatchesUtitlies {
    numbers: number[][] = [
        [1, 1, 1, 0, 1, 1, 1],//0
        [0, 0, 1, 0, 0, 1, 0],//1
        [1, 0, 1, 1, 1, 0, 1],//2
        [1, 0, 1, 1, 0, 1, 1],//3
        [0, 1, 1, 1, 0, 1, 0],//4
        [1, 1, 0, 1, 0, 1, 1],//5
        [1, 1, 0, 1, 1, 1, 1],//6
        [1, 0, 1, 0, 0, 1, 0],//7
        [1, 1, 1, 1, 1, 1, 1],//8
        [1, 1, 1, 1, 0, 1, 1]//9
    ];

    public getNumberArray(n: number): number[] {
        if (n < 0 || n > 9) return [];

        return [...this.numbers[n]];
    }

    public isValidEquationResult(equation: Equation): boolean {
        
        let number1 = this.getNumberFromArray(equation.number1);
        let number2 = this.getNumberFromArray(equation.number2);
        
        let rightHandSide = this.getRightHandSide(number1, number2, equation.sign[0] == 1);
        let result = this.getNumberFromArray(equation.result);

        if (number1 == -1 || number2 == -1 || result == -1) return false;

        return rightHandSide == result;
    }

    private getRightHandSide(number1: number, number2: number, isAddition: boolean) : number {
        
        if (isAddition) return number1 + number2;
        return number1 - number2;
    }

    private getNumberFromArray(array: number[]) : number {
        if (array.length != 7) return -1;

         for (let i = 0; i < this.numbers.length; i++) {
            if (this.arraysAreEqual(this.numbers[i], array)) {
            return i;
        }
    }
    return -1;
    }

    public isValidEquationNumbers(equation:Equation) : boolean {
        return this.isValidNumber(equation.number1) && this.isValidNumber(equation.number2) && this.isValidNumber(equation.result);
    }


    public isValidNumber(num: number[]): boolean {
        for (let arr of this.numbers) {
            if (this.arraysAreEqual(arr, num)) {
                return true;
            }
        }
        return false;
    }
    private arraysAreEqual(arr1: number[], arr2: number[]): boolean {
        if (arr1.length !== arr2.length)
            return false;

        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }

    public getDefaultEquation(): Equation{
        let equation = new Equation();
        equation.number1 = this.getNumberArray(6);
        equation.number2 = this.getNumberArray(4);
        equation.sign = [1];
        equation.result = this.getNumberArray(4);
        return equation; 
    }
}