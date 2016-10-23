export interface ILinkedList<T> {
    size(): number;
    isEmpty(): boolean;
    valueAt(index: number): T;
    pushFront(value: T): void;
    popFront(): T;
    pushBack(value: T): void;
    popBack(): T;
    front(): T;
    back(): T;
    insertAt(index: number, value: T): void;
    removeAt(index: number): T;
    reverse(): void;
    filter(predicate: {(value: T): boolean}): void;
}
