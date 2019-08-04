import { Heap } from './Heap';

/**
 * A Fibonacci heap is a heap data structure similar to the binomial heap,
 * only with a few modifications and a looser structure.
 *
 * The Fibonacci heap was designed in order to improve Dijkstra’s shortest path algorithm
 * from O(mlogn)O(m \log n)O(mlogn) to O(m+nlogn)O(m + n \log n)O(m+nlogn)
 * by optimising the operations used most by the algorithm.
 *
 * Its name derives from the fact that the Fibonacci sequence
 * is used in the complexity analysis of its operations.
 */
export class FibonacciHeap<K, V> implements Heap<INode<K, V>> {
    public root?: Node<K, V>;
    private nodeCount: number = 0;

    public constructor(
        private readonly heapProperty: (a: K, b: K) => boolean,
        private readonly MAX_VALUE: K,
    ) {}

    public findMax(): INode<K, V> {
        return this.root;
    }

    public insert(node: INode<K, V>): Node<K, V> {
        const newNode = new Node(node.key, node.value);
        this.root = this.mergeLists(this.root, newNode);
        this.nodeCount++;
        return newNode;
    }

    public increaseKey(node: Node<K, V>, key: K): void {
        if (!this.isHeap(node, { key })) {
            throw new Error(`New key is smaller than old`);
        }
        node.key = key;
        if (node.parent && this.isHeap(node, node.parent)) {
            this.cut(node);
        }
    }

    public delete(node: Node<K, V>): void {
        this.increaseKey(node, this.MAX_VALUE);
        this.extractMax();
    }

    public extractMax(): INode<K, V> {
        if (!this.root) {
            return;
        }
        const max = this.root;
        // remove children's parent refs
        if (max.child) {
            for (const child of nodeList(max.child)) {
                delete child.parent;
            }
        }
        // get a reference to the next unique node in the root list
        const nextInRootList = max.next !== max ? max.next : undefined;
        // remove the root from it's list
        this.removeNodeFromList(max);
        this.root = this.mergeLists(nextInRootList, max.child);
        this.consolidate();
        this.nodeCount--;
        return max;
    }

    public replace(value: INode<K, V>): void {
        throw new Error('Method not implemented.');
    }

    public create(): Heap<INode<K, V>> {
        throw new Error('Method not implemented.');
    }

    public heapify(elements: Array<INode<K, V>>): Heap<INode<K, V>> {
        throw new Error('Method not implemented.');
    }

    public merge(heap: FibonacciHeap<K, V>): FibonacciHeap<K, V> {
        this.root = this.mergeLists(this.root, heap.root);
        return this;
    }

    public meld(heap: Heap<INode<K, V>>): Heap<INode<K, V>> {
        throw new Error('Method not implemented.');
    }

    public size(): number {
        return this.nodeCount;
    }

    public isEmpty(): boolean {
        return this.nodeCount === 0;
    }

    private isHeap(a: Comparable<K>, b: Comparable<K>): boolean {
        return this.heapProperty(a.key, b.key);
    }

    /**
     * Merge all trees of thew same order together
     * until there are no two trees of the same order
     */
    private consolidate() {
        if (!this.root) {
            return;
        }
        const degrees = new Map<number, Node<K, V>>();
        for (let node of nodeListCopy(this.root)) {
            while (degrees.has(node.degree)) {
                let degree = degrees.get(node.degree);
                if (this.isHeap(node, degree)) {
                    const temp = node;
                    node = degree;
                    degree = temp;
                }
                this.linkHeaps(degree, node);
                degrees.delete(node.degree);
            }
            degrees.set(node.degree, node);
        }
        for (const [, node] of degrees) {
            this.removeNodeFromList(node);
            this.root = this.mergeLists(this.root, node);
        }
    }

    /**
     * Merge two nodes together into the same circular linked list
     */
    private mergeLists(a?: Node<K, V>, b?: Node<K, V>): Node<K, V> | undefined {
        if (!a && !b) {
            return undefined;
        }
        if (!a) {
            return b;
        }
        if (!b) {
            return a;
        }

        const temp = a.next;
        a.next = b.next;
        a.next.prev = a;
        b.next = temp;
        b.next.prev = b;

        return this.isHeap(a, b) ? a : b;
    }

    private linkHeaps(max: Node<K, V>, min: Node<K, V>) {
        this.removeNodeFromList(min);
        max.child = this.mergeLists(min, max.child);
        min.parent = max;
        min.marked = false;
        max.degree++;
    }

    private removeNodeFromList(node: Node<K, V>): void {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        node.prev = node.next = node;
    }

    /**
     * Perform a cascading cut on a node; mark the node if it is not marked,
     * otherwise cut the node and perform a cascading cut on its parent.
     * @param node The node being considered to be cut.
     * @param minNode The minimum node in the root list.
     * @return The heap's new minimum node.
     */
    private cut(node: Node<K, V>): void {
        const parent = node.parent;
        if (!parent) {
            return;
        }
        parent.degree--;
        node.parent = undefined;
        node.marked = false;
        this.removeNodeFromList(node);
        this.root = this.mergeLists(this.root, node);
        if (parent.marked) {
            this.cut(parent);
        } else {
            parent.marked = true;
        }
    }
}

export interface Comparable<K> {
    key: K;
}

export type INode<K, V> = Comparable<K> & {
    value: V;
};

// tslint:disable-next-line: max-classes-per-file
export class Node<K, V> implements INode<K, V> {
    public parent?: Node<K, V>;
    public next: Node<K, V> = this;
    public prev: Node<K, V> = this;
    public child?: Node<K, V>;
    public marked: boolean = false;
    public degree: number = 0;

    public constructor(public key: K, public value: V) {}
}

export function* nodeListCopy<K, V>(
    node: Node<K, V>,
): IterableIterator<Node<K, V>> {
    let currentNode = node.next;
    const nodeArr = [currentNode];
    while (currentNode !== node) {
        currentNode = currentNode.next;
        nodeArr.push(currentNode);
    }
    yield* nodeArr;
}

export function* nodeList<K, V>(
    node: Node<K, V>,
): IterableIterator<Node<K, V>> {
    let currentNode = node.next;
    while (currentNode !== node) {
        yield currentNode;
        currentNode = currentNode.next;
    }
}
