import { BinaryHeap } from '../../../structures/trees/heap/binaryHeap';
import { ISorter } from '../ISorter';

/**
 * Heap sort
 */
export class HeapSort<T> implements ISorter<T> {
    public constructor(private readonly compareFn: (a: T, b: T) => boolean) {}

    /**
     * O(nlog(n))
     */
    public sort(elements: T[]): T[] {
        const heap = new BinaryHeap(this.compareFn, elements);
        const results: T[] = [];
        while (!heap.isEmpty()) {
            results.push(heap.extractMax());
        }
        return results;
    }
}
