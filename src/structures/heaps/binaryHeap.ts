import { ArrayBinaryNode } from '../trees/binaryTree/arrayBinaryTree';
import { Heap } from './Heap';

export class BinaryHeap<T> implements Heap<T> {
    public get root(): ArrayBinaryNode<T> {
        return new ArrayBinaryNode(this.elements, 0);
    }
    public get leaf(): ArrayBinaryNode<T> {
        return new ArrayBinaryNode(this.elements, this.elements.length - 1);
    }

    private readonly heapCondition: (a: T, b: T) => boolean;

    /**
     * Bottom-up heap construction O(n)
     */
    public constructor(
        heapCondition = (higher: T, lower: T) =>
            (higher as any) >= (lower as any),
        private readonly elements: T[] = [],
    ) {
        this.heapCondition = (a, b) =>
            heapCondition(a, b) || !heapCondition(b, a);
        for (let i = Math.ceil(elements.length / 2); i >= 0; i--) {
            this.siftDown(new ArrayBinaryNode(elements, i));
        }
    }
    decreaseKey() {
        throw new Error('Method not implemented.');
    }

    replace(value: T): void {
        throw new Error('Method not implemented.');
    }
    merge(heap: Heap<T>): Heap<T> {
        throw new Error('Method not implemented.');
    }
    meld(heap: Heap<T>): Heap<T> {
        throw new Error('Method not implemented.');
    }

    /**
     * Retrieves the top node of the heap
     *
     * O(1)
     */
    findMax(): T {
        return this.elements[0];
    }
    extractMax(): T {
        if (this.isEmpty()) {
            throw new Error(`Cannot extract max from empty heap`);
        }
        const max = this.root.value;
        const leaf = this.elements.pop();
        if (!this.isEmpty()) {
            this.root.value = leaf;
            this.siftDown(this.root);
        }
        return max;
    }
    deleteMax(): void {
        throw new Error('Method not implemented.');
    }
    create(): Heap<T> {
        throw new Error('Method not implemented.');
    }
    heapify(): Heap<T> {
        throw new Error('Method not implemented.');
    }
    size(): number {
        return this.elements.length;
    }
    isEmpty(): boolean {
        return this.size() === 0;
    }

    /**
     * Adds a new element to the heap, preserving the heap property
     *
     * O(nlog(n))
     */
    public insert(value: T): void {
        this.elements.push(value);
        this.siftUp(this.leaf);
    }

    /**
     * Sifts the value of a node up the tree until the heap value is preserved
     */
    private siftUp(node: ArrayBinaryNode<T>): void {
        if (
            node.parent.value !== undefined &&
            this.heapCondition(node.value, node.parent.value)
        ) {
            this.swap(node, node.parent);
            this.siftUp(node.parent);
        }
    }

    /**
     * Move a node down the tree until the heap value is preserved
     */
    private siftDown(node: ArrayBinaryNode<T>): void {
        // if necessary swap the node with it's highest valued child then iterate
        if (
            node.left.value !== undefined &&
            this.heapCondition(node.left.value, node.value) &&
            (node.right.value === undefined ||
                this.heapCondition(node.left.value, node.right.value))
        ) {
            this.swap(node, node.left);
            this.siftDown(node.left);
        }
        if (
            node.right.value !== undefined &&
            this.heapCondition(node.right.value, node.value) &&
            (node.left.value === undefined ||
                this.heapCondition(node.right.value, node.left.value))
        ) {
            this.swap(node, node.right);
            this.siftDown(node.right);
        }
    }

    private swap(nodeA: ArrayBinaryNode<T>, nodeB: ArrayBinaryNode<T>): void {
        const nodeAVal = nodeA.value;
        nodeA.value = nodeB.value;
        nodeB.value = nodeAVal;
    }
}
