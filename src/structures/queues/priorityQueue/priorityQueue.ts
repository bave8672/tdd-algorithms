import { IPriorityQueue } from '../priorityQueue';

/**
 * https://en.wikipedia.org/wiki/Priority_queue#Usual_implementation
 */
export class PriorityQueue<T> implements IPriorityQueue<T> {
    private readonly heap: Array<Node<T>> = [];

    public isEmpty(): boolean {
        return this.heap.length === 0;
    }

    public insert(item: T, priority: number): void {
        throw new Error('Method not implemented.');
    }

    public get(): T {
        throw new Error('Method not implemented.');
    }
}

interface Node<T> {
    value: T;
    priority: number;
}
