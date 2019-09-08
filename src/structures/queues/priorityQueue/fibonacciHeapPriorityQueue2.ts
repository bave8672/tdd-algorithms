import {
    CompareFunction,
    FibonacciHeap2,
    Node,
} from '../../heaps/fibonacciHeap2';
import { PriorityQueue } from './PriorityQueue';

/**
 * https://en.wikipedia.org/wiki/Priority_queue#Usual_implementation
 */
export class FibonacciHeapPriorityQueue2<T extends {}>
    implements PriorityQueue<T> {
    public readonly heap: FibonacciHeap2<number, T>;
    public readonly map = new Map<T, Node<number, T>>();

    public constructor(compare: CompareFunction<number, T>) {
        this.heap = new FibonacciHeap2<number, T>(compare);
    }

    isEmpty(): boolean {
        return this.heap.isEmpty();
    }

    insertWithPriority(value: T, priority: number) {
        const node = this.heap.insert(priority, value);
        this.map.set(value, node);
    }

    pullHighestPriorityElement(): T {
        const max = this.heap.extractMinimum();
        const value = max.value;
        this.map.delete(value);
        return value;
    }

    increasePriority(value: T, priority: number) {
        const node = this.map.get(value);
        this.heap.decreaseKey(node, priority);
    }

    public contains(value: T): boolean {
        return this.map.has(value);
    }
}
