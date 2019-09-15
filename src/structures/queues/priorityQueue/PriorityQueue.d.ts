export interface PriorityQueue<T> {
    isEmpty(): boolean;
    insertWithPriority(value: T, priority: number);
    pullHighestPriorityElement(): T;
    increasePriority(value: T, priority: number);
}
