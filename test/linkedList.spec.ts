/// <reference path="../typings/index.d.ts" />

import { LinkedList } from '../src/structures/linkedLists/singlyLinkedList/LinkedList';

let list: LinkedList<any>;

describe('A Linked List', () => {

    beforeEach(() => {
        list = new LinkedList();
    });

    it('Can be instanciated.', () => {
        expect(list).not.toBeNull();
    });

    it('Is instanciated with size 0.', () => {
        expect(list.size()).toBe(0);
    });

    it('Is empty when instanciated', () => {
        expect(list.isEmpty()).toBe(true);
    });

    it('Can have elements added to the front.', () => {
        list.pushFront('first');
        list.pushFront('second');
        list.pushFront('third');

        expect(list.isEmpty()).toBe(false);
        expect(list.size()).toBe(3);
    });

    it('Can have elements added to the back.', () => {
        list.pushBack('first');
        list.pushBack('second');
        list.pushBack('third');

        expect(list.isEmpty()).toBe(false);
        expect(list.size()).toBe(3);
    });

    it('Can pop elements from the front.', () => {
        list.pushFront('first');
        list.pushFront('second');
        list.pushFront('third');

        const firstOut = list.popFront();
        expect(firstOut).toBe('third');
        expect(list.size()).toBe(2);

        const secondOut = list.popFront();
        expect(secondOut).toBe('second');
        expect(list.size()).toBe(1);

        const thirdOut = list.popFront();
        expect(thirdOut).toBe('first');
        expect(list.size()).toBe(0);
    });

    it('Can pop elements from the end', () => {
        list.pushFront('first');
        list.pushFront('second');
        list.pushFront('third');

        const firstOut = list.popBack();
        expect(firstOut).toBe('first');
        expect(list.size()).toBe(2);

        const secondOut = list.popBack();
        expect(secondOut).toBe('second');
        expect(list.size()).toBe(1);

        const thirdOut = list.popBack();
        expect(thirdOut).toBe('third');
        expect(list.size()).toBe(0);
    });

    it('Can get the front value without modifying itself', () => {
        list.pushFront('first');
        list.pushFront('second');
        list.pushFront('third');

        expect(list.front()).toBe('third');
        expect(list.size()).toBe(3);

        expect(list.front()).toBe('third');
        expect(list.size()).toBe(3);
    });

    it('Can get the back value without modifying itself', () => {
        list.pushFront('first');
        list.pushFront('second');
        list.pushFront('third');

        expect(list.back()).toBe('first');
        expect(list.size()).toBe(3);

        expect(list.back()).toBe('first');
        expect(list.size()).toBe(3);
    });

    it('Can get the value at an arbitrary index', () => {
        list.pushFront('first');
        list.pushFront('second');
        list.pushFront('third');

        expect(list.valueAt(0)).toBe('third');
        expect(list.valueAt(1)).toBe('second');
        expect(list.valueAt(2)).toBe('first');
    });

    it('Can insert values at an arbitrary index', () => {
        list.pushFront('first');
        list.pushFront('second');
        list.pushFront('third');

        list.insertAt(1, 'INSERTED_1');
        list.insertAt(3, 'INSERTED_2');

        expect(list.size()).toBe(5);
        expect(list.valueAt(0)).toBe('third');
        expect(list.valueAt(1)).toBe('INSERTED_1');
        expect(list.valueAt(2)).toBe('second');
        expect(list.valueAt(3)).toBe('INSERTED_2');
        expect(list.valueAt(4)).toBe('first');
    });

    it('can add values using pushFront() when it is empty', () => {
        list.insertAt(0, 'Hello.');
        expect(list.valueAt(0)).toBe('Hello.');
    });

    it('will throw an error when trying to add values at an out of bounds index.', () => {
        expect(() => list.insertAt(100, 'nope!')).toThrowError();

        list.pushFront('first');
        list.pushFront('second');
        list.pushFront('third');

        expect(() => list.insertAt(100, 'nope!')).toThrowError();
    });

    it('will throw an error then trying to insert values at a negative index.', () => {
        expect(() => list.insertAt(-1, 'nope!')).toThrowError();
        expect(() => list.insertAt(-100, 'nope!')).toThrowError();
    });

    it('can remove values at an arbitrary index', () => {
        list.pushFront('first');
        list.pushFront('second');
        list.pushFront('third');
        list.pushFront('fourth');
        list.pushFront('fifth');
        list.pushFront('sixth');

        expect(list.removeAt(1)).toBe('fifth');
        expect(list.size()).toBe(5);

        expect(list.removeAt(3)).toBe('second');
        expect(list.size()).toBe(4);
    });

    it('Can reverse it\'s elements', () => {
        list.pushFront('first');
        list.pushFront('second');
        list.pushFront('third');
        list.pushFront('fourth');
        list.pushFront('fifth');
        list.pushFront('sixth');

        list.reverse();

        expect(list.valueAt(0)).toBe('first');
        expect(list.valueAt(1)).toBe('second');
        expect(list.valueAt(2)).toBe('third');
        expect(list.valueAt(3)).toBe('fourth');
        expect(list.valueAt(4)).toBe('fifth');
        expect(list.valueAt(5)).toBe('sixth');
    });

    it('Can reverse an emplty list and not error', () => {
        list.reverse();
    });

    it('Can filter it\'s own values according to a predicate', () => {
        list.pushFront(5);
        list.pushFront(4);
        list.pushFront(3);
        list.pushFront(2);
        list.pushFront(1);
        list.pushFront(0);

        list.filter(x => x % 2 === 1);

        expect(list.valueAt(0)).toBe(1);
        expect(list.valueAt(1)).toBe(3);
        expect(list.valueAt(2)).toBe(5);
    });
});
