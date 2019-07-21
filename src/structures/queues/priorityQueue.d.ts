/**
 * https://en.wikipedia.org/wiki/Priority_queue
 */
export interface IPriorityQueue<T> {
    isEmpty(): boolean;
    insert(item: T, priority: number): void;
    get(): T;
}
