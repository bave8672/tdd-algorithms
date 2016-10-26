import { ISorter } from '../ISorter';

/* 
    Generic merge sort
*/

export class MergeSorter<T> implements ISorter<T> {

    constructor(private less: { (x: T, y: T): boolean; } = (a, b) => a <= b) {
        return;
    }

    sort(list: T[]): T[] {
        if (list.length <= 1) {
            return list;
        }

        let half = Math.floor(list.length / 2);
        return this.merge(this.sort(list.slice(0, half)), this.sort(list.slice(half, list.length)));
    }

    // Merge two sorted lists
    public merge(x: T[], y: T[], target: T[] = []): T[] {

        console.log('merge:', x, y, target);

        // If both list are empty, return the target
        if (x.length === 0 && y.length === 0) {
            return target;
        }

        let x0 = x[0];
        let y0 = y[0];

        // Otherwise take the smallest value from the start of one list and push it to the target
        if (y.length === 0 || this.less(x0, y0)) {
            target.push(x.shift());
        } else if (x.length === 0 || this.less(y0, x0)) {
            target.push(y.shift());
        }

        return this.merge(x, y, target);
    }
}
