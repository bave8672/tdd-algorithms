/**
 * A heap is a specialized tree-based data structure which is essentially an tree that satisfies the heap property:
 * in a max heap, for any given node C, if P is a parent node of C, then the key (the value) of P is greater than or equal to the key of C.
 * In a min heap, the key of P is less than or equal to the key of C.
 * The node at the "top" of the heap (with no parents) is called the root node.
 *
 * https://en.wikipedia.org/wiki/Heap_(data_structure)
 */
export interface Heap<T> {
    // #region Basic operations
    /**
     * find a maximum item of a max-heap, or a minimum item of a min-heap, respectively (a.k.a. peek)
     */
    findMax(): T;

    /**
     * add a new key to the heap (a.k.a. push)
     */
    insert(value: T): void;
    /**
     * returns the node of maximum value from a max heap [or minimum value from a min heap] after removing it from the heap (a.k.a., pop)
     */
    extractMax(): T;
    /**
     * pop root and push a new key. More efficient than pop followed by push, since only need to balance once, not twice, and appropriate for fixed-size heaps.
     */
    replace(value: T): void;
    // #endregion
    // #region Creation
    /**
     * Create an empty heap
     */
    create(): Heap<T>;
    /**
     *  Create a heap out of given array of elements
     */
    heapify(elements: T[]): Heap<T>;
    /**
     *  Join two heaps to form a valid new heap containing all the elements of both, preserving the original heaps.
     */
    merge(heap: Heap<T>): Heap<T>;
    /**
     *  Joining two heaps to form a valid new heap containing all the elements of both, destroying the original heaps.
     */
    meld(heap: Heap<T>): Heap<T>;
    // #endregion
    // #region Inspection
    /**
     * Return the number of items in the heap.
     */
    size(): number;
    /**
     * Return true if the heap is empty, false otherwise.
     */
    isEmpty(): boolean;
    // #endregion
}
