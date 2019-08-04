import { PriorityQueue } from './PriorityQueue';

/**
 * https://en.wikipedia.org/wiki/Priority_queue#Usual_implementation
 */
export class FibonacciHeapPriorityQueue<T> implements PriorityQueue<T> {
    isEmpty(): boolean {
        throw new Error('Method not implemented.');
    }
    insertWithPriority(value: T, priority: number) {
        throw new Error('Method not implemented.');
    }
    pullHighestPriorityElement(): T {
        throw new Error('Method not implemented.');
    }
    decreasePriority(value: T, priority: number) {
        throw new Error('Method not implemented.');
    }
}

interface Node<T> {
    value: T;
    priority: number;
}
