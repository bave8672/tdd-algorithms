/**
 * https://en.wikipedia.org/wiki/Binary_tree#Arrays
 */
export class ArrayBinaryNode<T> {
    public constructor(
        private readonly array: T[] = [],
        private readonly index: number = 0,
    ) {}

    public get value(): T | undefined {
        return this.array[this.index];
    }
    public set value(value: T) {
        this.array[this.index] = value;
    }
    public get left(): ArrayBinaryNode<T> {
        return new ArrayBinaryNode(this.array, 2 * this.index + 1);
    }
    public get right(): ArrayBinaryNode<T> {
        return new ArrayBinaryNode(this.array, 2 * this.index + 2);
    }
    public get parent(): ArrayBinaryNode<T> {
        return new ArrayBinaryNode(
            this.array,
            Math.floor((this.index - 1) / 2),
        );
    }
}
