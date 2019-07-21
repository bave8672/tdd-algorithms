import { ArrayBinaryNode } from '../src/structures/trees/binaryTree/arrayBinaryTree';
import { BinaryHeap } from '../src/structures/trees/heap/binaryHeap';

describe(`Heap`, () => {
    describe(`construction`, () => {
        it(`empty heap`, () => {
            assertHeap(new BinaryHeap<number>(max, []).head, max);
        });

        it(`max`, () => {
            assertHeap(new BinaryHeap<number>(max, [1, 2, 3, 4, 5]).head, max);
        });

        it(`max reversed`, () => {
            assertHeap(new BinaryHeap<number>(max, [5, 4, 3, 2, 1]).head, max);
        });

        it(`min`, () => {
            assertHeap(new BinaryHeap<number>(min, [1, 2, 3, 4, 5]).head, min);
        });

        it(`min reversed`, () => {
            assertHeap(new BinaryHeap<number>(min, [5, 4, 3, 2, 1]).head, min);
        });

        it(`same elements`, () => {
            assertHeap(new BinaryHeap<number>(min, [0, 0, 0]).head, min);
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
                ]).head,
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
            expect(heap.head.value).toEqual(100);
            assertHeap(heap.head, max);
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
            expect(heap.head.value).toEqual(10);
            assertHeap(heap.head, max);
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
