import { Tube } from "./Tube";



export class Solver {

    private solutionArray: number[][] = [];
    private stacks: Tube[] = [];
    public Solve(stacks: Tube[]) {

        for (let index = 0; index < stacks.length; index++) {
            let tube = new Tube();
            tube.stack = [...stacks[index].stack];
            
            this.stacks.push(tube);
        }
        this.Recursion([]);

        return this.solutionArray;


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
                    var tempFrom = [... this.stacks[i].stack];
                    var tempTo = [... this.stacks[j].stack];
                    linkedList.push([i, j]);
                    this.Move(this.stacks[i], this.stacks[j]);
                    this.Recursion(linkedList);
                    this.stacks[i].stack = tempFrom;
                    this.stacks[j].stack = tempTo;
                    linkedList.pop();
                }
            }
        }
    }

    private CanMove(from: Tube, to: Tube): boolean {
        if (from.stack.length == 0) return false;
        if (!to.canMoveTo(from.getTopLayer(), from.getTopLayerCount())) return false;

        if (from.stack.length == from.getTopLayerCount() && to.stack.length == 0) return false;

        return true;
    }


    private Move(from: Tube, to: Tube) {
        to.add(from.getTopLayer(), from.getTopLayerCount());
        from.clear();
    }
    private IsSolved(): boolean {
        for (let index = 0; index < this.stacks.length; index++) {
            let flag = false;
            if (this.stacks[index].stack.length == 0) {
                flag = true;
            }
            if (this.stacks[index].getTopLayerCount() == 4) {
                flag = true;
            }
            if (!flag) return false;
        }
        return true;
    }
}
