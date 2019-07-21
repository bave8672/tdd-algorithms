export interface Queue<T> {
    enqueue(x: T);
    dequeue(): T;
    empty();
}
