import { BinaryHeap } from '../src/structures/heaps/binaryHeap';
import { ArrayBinaryNode } from '../src/structures/trees/binaryTree/arrayBinaryTree';

describe(`Binary Heap`, () => {
    describe(`construction`, () => {
        it(`empty heap`, () => {
            assertHeap(new BinaryHeap<number>(max, []).root, max);
        });

        it(`max`, () => {
            assertHeap(new BinaryHeap<number>(max, [1, 2, 3, 4, 5]).root, max);
        });

        it(`max reversed`, () => {
            assertHeap(new BinaryHeap<number>(max, [5, 4, 3, 2, 1]).root, max);
        });

        it(`min`, () => {
            assertHeap(new BinaryHeap<number>(min, [1, 2, 3, 4, 5]).root, min);
        });

        it(`min reversed`, () => {
            assertHeap(new BinaryHeap<number>(min, [5, 4, 3, 2, 1]).root, min);
        });

        it(`same elements`, () => {
            assertHeap(new BinaryHeap<number>(min, [0, 0, 0]).root, min);
        });

        it(`larger example`, () => {
            assertHeap(
                new BinaryHeap<number>(min, [
                    1,
                    100,
                    1000,
                    3,
                    4,
                    54,
                    56,
                    6,
                    7,
                    8,
                    33,
                    555,
                    55,
                    3,
                    -1,
                ]).root,
                min,
            );
        });
    });

    describe(`adding`, () => {
        it(`should add a new item to the top`, () => {
            const heap = new BinaryHeap<number>(max, [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
            ]);
            heap.insert(100);
            expect(heap.root.value).toEqual(100);
            assertHeap(heap.root, max);
        });

        it(`should add a new item to the bottom`, () => {
            const heap = new BinaryHeap<number>(max, [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
            ]);
            heap.insert(-1);
            expect(heap.root.value).toEqual(10);
            assertHeap(heap.root, max);
        });
    });

    describe(`extractMax`, () => {
        it('should pop the root off the heap', () => {
            const heap = new BinaryHeap(max, [1]);
            expect(heap.extractMax()).toBe(1);
            expect(heap.root.value).toBe(undefined);
            assertHeap(heap.root, max);
        });

        it('should pop the root off the heap', () => {
            const heap = new BinaryHeap(max, [1, 2, 3, 4, 5]);
            expect(heap.extractMax()).toBe(5);
            expect(heap.root.value).toBe(4);
            assertHeap(heap.root, max);
        });
    });
});

function assertHeap(
    node: ArrayBinaryNode<number>,
    heapProperty: (a: number, b: number) => boolean,
): boolean {
    if (node.value === undefined) {
        return;
    }
    if (node.left.value !== undefined) {
        if (!heapProperty(node.value, node.left.value)) {
            throw new Error(
                `heap property not met for ${node.value} and left child ${node.left.value}`,
            );
        }
        assertHeap(node.left, heapProperty);
    }
    if (node.right.value !== undefined) {
        if (!heapProperty(node.value, node.right.value)) {
            throw new Error(
                `heap property not met for ${node.value} and right child ${node.right.value}`,
            );
        }
        assertHeap(node.right, heapProperty);
    }
}

function max(a: number, b: number): boolean {
    return a >= b;
}

function min(a: number, b: number): boolean {
    return a <= b;
}
