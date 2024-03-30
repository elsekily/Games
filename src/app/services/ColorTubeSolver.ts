import { Injectable } from "@angular/core";
import { Tube } from "../models/ColorTubes/Tube";

@Injectable({
  providedIn: 'root' // This tells Angular to provide this service at the root level
})

export class ColorTubeSolver {

    private solutionArray: number[][] = [];
    private stacks: Tube[] = [];
    public Solve(stacks: Tube[]): number[][] {
        
        this.solutionArray = [];

        if (!this.IsValid(stacks))
            return [];

        for (let index = 0; index < stacks.length; index++)
            this.stacks.push(stacks[index].clone());

        this.Recursion([]);

        return this.solutionArray 
    }
    private count: number = 0;

    private Recursion(linkedList: number[][]) {
        if (this.count > 200)
            return;

        if (this.IsSolved()) {
            this.count++;
            if (this.solutionArray.length == 0 || this.solutionArray.length > linkedList.length)
                this.solutionArray = [...linkedList];

            return;
        }


        for (let i = 0; i < this.stacks.length; i++) {
            for (let j = 0; j < this.stacks.length; j++) {
                if (i != j && this.CanMove(this.stacks[i], this.stacks[j])) {
                    var tempFrom = this.stacks[i].clone();
                    var tempTo = this.stacks[j].clone();
                    linkedList.push([i, j]);
                    this.Move(this.stacks[i], this.stacks[j]);
                    this.Recursion(linkedList);
                    this.stacks[i] = tempFrom;
                    this.stacks[j] = tempTo;
                    linkedList.pop();
                }
            }
        }
    }

    private CanMove(from: Tube, to: Tube): boolean {
        if (from.GetCount() == 0) return false;
        if (!to.canMoveTo(from.getTopLayer(), from.getTopLayerCount())) return false;

        if (from.GetCount() == from.getTopLayerCount() && to.GetCount() == 0) return false;

        return true;
    }


    private Move(from: Tube, to: Tube) {
        to.add(from.getTopLayer(), from.getTopLayerCount());
        from.clear();
    }
    private IsSolved(): boolean {
        for (let index = 0; index < this.stacks.length; index++) {
            let flag = false;
            if (this.stacks[index].GetCount() == 0) {
                flag = true;
            }
            if (this.stacks[index].getTopLayerCount() == 4) {
                flag = true;
            }
            if (!flag) return false;
        }
        return true;
    }

    public IsValid(stacks: Tube[]): boolean {
        if (stacks.length === 0) return false;


        var colorsCount = new Map<string, number>();
        
        for (let i = 0; i < stacks.length; i++) {
            for (let j = 0; j < stacks[i].GetMaxCount(); j++) {
                if (stacks[i].GetByIndex(j) === '')
                    continue;


                let value = (colorsCount.get(stacks[i].GetByIndex(j)) ?? 0) + 1;
                console.log(value);

                colorsCount.set(stacks[i].GetByIndex(j), value);
            }
            
        }

        let array = Array.from(colorsCount.values());

        if (array.length === 0)
            return false;
        
        return array.every(v=> v === 4);
    }
}
