export class CircularBuffer<T> {

    // Emulated memory block
    private mem: { [index: number]: T } = {};
    // "Head" or current write point
    private head: number = 0;
    // "Tail" or current read point
    private tail: number = 0;

    public isFull: boolean = false;

    constructor(public size: number) {

    }

    public read(): T {
        // Can't read an entry that hasn't been written yet
        if (this.head === this.tail) {
            return null;
        }

        // Read the value and reset that entry
        const val = this.mem[this.tail];
        this.mem[this.tail] = null;

        // Increment the tail
        this.tail++;
        this.isFull = false;
        return val;
    }

    public write(val: T): void {
        if (this.isFull) {
            return;
        }
        if (this.next(this.head) === this.tail) {
            this.isFull = true;
        }
        this.mem[this.head] = val;
        this.head++;
    }

    private next(position: number) {
        return (position + 1) % this.size;
    }
}
