import {
    FibonacciHeap,
    Node,
    nodeList,
} from './structures/heaps/FibonacciHeap';

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
            expect(heap.root.value).toBe(undefined);
            assertHeap(heap.root, max);
        });

        it('should pop the root off the heap', () => {
            const heap = new FibonacciHeap(max, Number.MAX_VALUE);
            [1, 2, 3, 4, 5].forEach(n => heap.insert({ key: n, value: n }));
            [1, 2, 3, 4, 5].forEach(n => {
                expect(heap.extractMax()).toEqual(
                    jasmine.objectContaining({ key: 1, value: 1 }),
                );
                assertHeap(heap.root, max);
            });
            expect(heap.extractMax()).toBe(5);
            expect(heap.root.value).toBe(4);
            assertHeap(heap.root, max);
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

function max(a: number, b: number): boolean {
    return a - b >= 0;
}

function min(a: number, b: number): boolean {
    return b - a >= 0;
}

function heapError(parent: Node<any, any>, child: Node<any, any>) {
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
