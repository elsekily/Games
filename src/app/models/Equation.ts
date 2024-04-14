
export class Equation {
    number1: number[] = [];
    number2: number[] = [];
    sign: number[] = [];
    result: number[] = [];


    public clone(): Equation{
        let equation = new Equation();
        equation.number1 = [...this.number1];
        equation.sign = [...this.sign];
        equation.number2 = [...this.number2];
        equation.result = [...this.result];


        return equation;
    }
}
