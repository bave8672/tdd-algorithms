import { max } from '../src/algorithms/comparison/max';
import { min } from '../src/algorithms/comparison/min';
import {
    FibonacciHeap,
    Node,
    nodeList,
} from '../src/structures/heaps/FibonacciHeap';

describe(`Fibonacci Heap`, () => {
    describe(`construction`, () => {
        it(`empty heap`, () => {
            assertHeap(
                new FibonacciHeap<number, number>(max, Number.MAX_VALUE).root,
                max,
            );
        });
    });

    describe(`adding`, () => {
        it(`max`, () => {
            const heap = new FibonacciHeap<number, number>(
                max,
                Number.MAX_VALUE,
            );
            [1, 2, 3, 4, 5].forEach(n => heap.insert({ key: n, value: n }));
            assertHeap(heap.root, max);
        });

        it(`max reversed`, () => {
            const heap = new FibonacciHeap<number, number>(
                max,
                Number.MAX_VALUE,
            );
            [5, 4, 3, 2, 1].forEach(n => heap.insert({ key: n, value: n }));
            assertHeap(heap.root, max);
        });

        it(`min`, () => {
            const heap = new FibonacciHeap<number, number>(
                min,
                Number.MAX_VALUE,
            );
            [1, 2, 3, 4, 5].forEach(n => heap.insert({ key: n, value: n }));
            assertHeap(heap.root, min);
        });

        it(`min reversed`, () => {
            const heap = new FibonacciHeap<number, number>(
                min,
                Number.MAX_VALUE,
            );
            [5, 4, 3, 2, 1].forEach(n => heap.insert({ key: n, value: n }));
            assertHeap(heap.root, min);
        });

        it(`same elements`, () => {
            const heap = new FibonacciHeap<number, number>(
                min,
                Number.MAX_VALUE,
            );
            [0, 0, 0].forEach(n => heap.insert({ key: n, value: n }));
            assertHeap(heap.root, min);
        });

        it(`larger example`, () => {
            const heap = new FibonacciHeap<number, number>(
                min,
                Number.MAX_VALUE,
            );
            [1, 100, 1000, 3, 4, 54, 56, 6, 7, 8, 33, 555, 55, 3, -1].forEach(
                n => heap.insert({ key: n, value: n }),
            );
            assertHeap(heap.root, min);
        });
    });

    describe(`extractMax`, () => {
        it('should pop the root off the heap', () => {
            const heap = new FibonacciHeap(max, Number.MAX_VALUE);
            heap.insert({ key: 1, value: 1 });
            expect(heap.extractMax()).toEqual(
                jasmine.objectContaining({ key: 1, value: 1 }),
            );
            expect(heap.root).toBe(undefined);
        });

        it('should pop the root off the heap', () => {
            const heap = new FibonacciHeap(min, Number.NEGATIVE_INFINITY);
            [3, 5, 2, 4, 6, 8, 7, 1].forEach((n, i) => {
                heap.insert({ key: n, value: n });
                expect(heap.size()).toBe(i + 1);
            });
            assertHeap(heap.root, min);
            [1, 2, 3, 4, 5, 6, 7, 8].forEach((n, i) => {
                expect(heap.extractMax()).toEqual(
                    jasmine.objectContaining({ key: n, value: n }),
                );
                assertHeap(heap.root, min);
                expect(heap.size()).toBe(8 - i - 1);
            });
        });
    });

    describe(`increase key`, () => {
        it(`should increase the key of a node 1`, () => {
            const heap = new FibonacciHeap(min, Number.NEGATIVE_INFINITY);
            const [a, b, c] = [1, 4, 6].map((n, i) => {
                return heap.insert({ key: n, value: n });
            });
            expect(nodeCount(heap.root)).toBe(3);

            heap.increaseKey(c, 0);
            expect(nodeCount(heap.root)).toBe(3);

            expect(heap.extractMax().value).toBe(6);
            expect(nodeCount(heap.root)).toBe(2);

            const node = heap.insert({ key: 100, value: 100 });
            expect(nodeCount(heap.root)).toBe(3);

            heap.increaseKey(node, 3);
            expect(nodeCount(heap.root)).toBe(3);

            expect(heap.extractMax().value).toBe(1);
            expect(nodeCount(heap.root)).toBe(2);

            expect(heap.extractMax().value).toBe(100);
            expect(nodeCount(heap.root)).toBe(1);

            expect(heap.extractMax().value).toBe(4);
            expect(nodeCount(heap.root)).toBe(0);
        });

        it(`should increase the key of a node 2`, () => {
            const heap = new FibonacciHeap(min, Number.NEGATIVE_INFINITY);
            const nodes = [5, 4, 3, 2, 1].map((n, i) => {
                return heap.insert({ key: n, value: n });
            });
            for (let i = -100; i > -200; i--) {
                heap.insert({ key: 0, value: 0 });
                nodes.forEach((node, index) => {
                    heap.increaseKey(node, i + index);
                });
            }
            nodes.forEach(node => {
                expect(heap.extractMax().value).toEqual(node.value);
            });
        });
    });
});

function assertHeap<V>(
    node: Node<number, V>,
    heapProperty: (a: number, b: number) => boolean,
    visited = new Set<Node<number, V>>(),
) {
    if (!node || visited.has(node)) {
        return;
    }
    visited.add(node);
    assertHeap(node.next, heapProperty, visited);
    if (!node.child) {
        return;
    }
    for (const child of nodeList(node.child)) {
        if (!heapProperty(node.key, child.key)) {
            heapError(node, child);
        }
    }
}

function heapError(parent: Node<any, any>, child: Node<any, any>) {
    debugger;
    throw new Error(
        `Heap property not satisfied for parent ${JSON.stringify({
            key: parent.key,
            value: parent.value,
        })} and child ${JSON.stringify({
            key: child.key,
            value: child.value,
        })}`,
    );
}

function nodeCount(
    node?: Node<any, any>,
    visited = new Set<Node<any, any>>(),
): number {
    if (!node || visited.has(node)) {
        return 0;
    }
    visited.add(node);
    return 1 + nodeCount(node.next, visited) + nodeCount(node.child, visited);
}
