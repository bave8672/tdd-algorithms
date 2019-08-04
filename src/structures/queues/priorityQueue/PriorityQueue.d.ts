export interface PriorityQueue<T> {
    isEmpty(): boolean;
    insertWithPriority(value: T, priority: number);
    pullHighestPriorityElement(): T;
    decreasePriority(value: T, priority: number);
}
