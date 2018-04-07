/*
    An emulated fixed-size, typed array
*/

export class FixedArray<T> {
    private mem: { [index: number]: T } = [];

    constructor(public size: number, init: T = null) {
        if (init != null) {
            for (let i = 0; i < size; i++) {
                this.mem[i] = init;
            }
        }
    }

    public set(index: number, value: T = null) {
        if (index < 0 || index >= this.size) {
            throw new Error(`Cannot allocate memory at index ${index}: out of bounds`);
        }

        this.mem[index] = value;
    }

    public get(index: number) {
        return this.mem[index];
    }
}
