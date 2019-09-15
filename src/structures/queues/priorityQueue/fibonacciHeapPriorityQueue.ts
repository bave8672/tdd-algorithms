import { max } from '../../../algorithms/comparison/max';
import { FibonacciHeap, Node } from '../../heaps/fibonacciHeap';
import { PriorityQueue } from './PriorityQueue';

/**
 * https://en.wikipedia.org/wiki/Priority_queue#Usual_implementation
 */
export class FibonacciHeapPriorityQueue<T extends {}>
    implements PriorityQueue<T> {
    public readonly heap: FibonacciHeap<number, T>;
    public readonly map = new Map<T, Node<number, T>>();

    public constructor(
        isHigherPriority: (a: number, b: number) => boolean = max,
        maxVal: number = Number.MAX_VALUE,
    ) {
        this.heap = new FibonacciHeap<number, T>(isHigherPriority, maxVal);
    }

    isEmpty(): boolean {
        return this.heap.isEmpty();
    }

    insertWithPriority(value: T, priority: number) {
        const node = this.heap.insert({ key: priority, value });
        this.map.set(value, node);
    }

    pullHighestPriorityElement(): T {
        const max = this.heap.extractMax();
        if (!max) {
            debugger;
        }
        const value = max.value;
        this.map.delete(value);
        return value;
    }

    increasePriority(value: T, priority: number) {
        const node = this.map.get(value);
        this.heap.increaseKey(node, priority);
    }

    public contains(value: T): boolean {
        return this.map.has(value);
    }
}
