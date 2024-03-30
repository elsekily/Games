
export class Tube {
    private stack: string[] = [];

    private maxCount = 4;
    
    public GetMaxCount() {
        return this.maxCount;
    }

    public getTopLayer(): string {
        if (this.stack.length === 0)
            return '';

        return this.stack[this.stack.length - 1];
    }

    public getTopLayerCount(): number {
        if (this.stack.length === 0) return 0;

        const temp: string[] = [];
        const topColor = this.stack[this.stack.length - 1];
        let layerCount = 0;
        while (this.stack.length !== 0 && this.stack[this.stack.length - 1] === topColor) {
            temp.push(this.stack.pop() as string);
            layerCount++;
        }

        while (temp.length > 0)
            this.stack.push(temp.pop() as string);

        return layerCount;
    }

    public add(color: string, count: number): void {
        if (this.stack.length == this.maxCount)
            return;
        while (count-- > 0)
            this.stack.push(color);
    }

    public clear(): void {
        let layerCount = this.getTopLayerCount();
        while (layerCount-- > 0)
            this.stack.pop();
    }

    public canMoveTo(color: string, layersNumber: number): boolean {
        if (this.stack.length === this.maxCount)
            return false;

        if (this.stack.length !== 0 && this.stack[this.stack.length - 1] !== color)
            return false;

        if (this.stack.length === 0 && layersNumber === this.maxCount)
            return false;

        const emptySlots = this.maxCount - this.stack.length;
        if (layersNumber > emptySlots)
            return false;

        return true;
    }

    public canMoveFrom(): boolean {
        if (this.stack.length === 0) return false;
        if (this.getTopLayerCount() === this.stack.length) return false;

        return true;
    }

    public GetCount() : number {
        return this.stack.length;
    }

    public RemoveOne() {
        this.stack.pop();
    }

    public GetByIndex(index: number): string {
        if (index < 0 || index >= this.stack.length)
            return '';
        
        return this.stack[index];
    }

    public clone(): Tube {
        let newTube = new Tube();
        newTube.stack = [...this.stack];
        return newTube;
    }


}