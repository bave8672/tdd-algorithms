import { ArrayBinaryNode } from '../src/structures/trees/binaryTree/arrayBinaryTree';

describe(`Array binary tree`, () => {
    it('should represent a binary tree', () => {
        const head = new ArrayBinaryNode([0, 1, 2, 3, 4, 5, 6], 0);
        expect(head.value).toBe(0);
        expect(head.left.value).toBe(1);
        expect(head.right.value).toBe(2);
        expect(head.left.left.value).toBe(3);
        expect(head.left.right.value).toBe(4);
        expect(head.right.left.value).toBe(5);
        expect(head.right.right.value).toBe(6);
    });

    it('should navigate up and down the tree', () => {
        const head = new ArrayBinaryNode([0, 1, 2, 3, 4, 5, 6], 0);
        expect(head.left.right.parent.parent.value).toBe(0);
    });

    it('should properly handle boundaries', () => {
        const head = new ArrayBinaryNode([0], 0);
        expect(head.left.value).toBe(undefined);
        expect(head.right.value).toBe(undefined);
        expect(head.parent.value).toBe(undefined);
    });
});
