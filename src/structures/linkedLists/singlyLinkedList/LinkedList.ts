import { Element } from './element/Element';
import { ILinkedList } from './ILinkedList';

/*
    Singly linked list with no tail reference
*/

export class LinkedList<T> implements ILinkedList<T> {

    /*
        Private Properties
    */

    head: Element<T> = new Element(null);

    /*
        Private Methods
    */

    // Run an arbitrary function on every element in the list
    private forEach(fn: {(element: Element<T>, index: number): boolean | void}) {
        let i = 0; // index
        let currentElement = this.head;

        while (currentElement.next) {
            currentElement = currentElement.next;
            const shouldBreak = fn(currentElement, i);

            // console.log(currentElement);

            if (shouldBreak === true) {
                break;
            }

            i++;
        }
    }

    private ForEachIncludingHead(fn: {(element: Element<T>, index: number): boolean | void}) {
        if (fn(this.head, -1)) {
            return;
        }

        this.forEach(fn);
    }

    private forLast(fn: {(element: Element<T>, index: number): any}) {
        this.forEach((el, index) => {
            if (el.next == null) {
                fn(el, index);
                return true;
            }
        });
    }

    /*
        Public Methods
    */

    // Returns number of data elements in list
    size(): number {
        let n = 0;
        this.forEach((el, index) => {
            n = index + 1;
        });
        return n;
    }

    // Returns true if empty
    isEmpty(): boolean {
        return this.head.next == null;
    }

    // Returns the value of the nth item (starting at 0 for first)
    valueAt(index: number): T {
        let value: T;
        this.forEach((el, i) => {
            if (i === index) {
                value = el.value;
                return true;
            }
        });
        return value;
    }
    // Adds an item to the front of the list
    pushFront(value: T): void {
        this.head.next = new Element<T>(value, this.head.next);
    }

    // Removes an item from the start of the list and returns it's value
    popFront(): T {
        let value: T;

        this.forEach((el, index) => {
            if (index === 0) {
                value = el.value;
                this.head.next = el.next;
                el = null;
                return true;
            }
        });

        return value;
    }

    // Adds an item to the end of the list
    pushBack(value: T): void {
        let newEl = new Element(value);

        if (this.head.next == null) {
            this.head.next = newEl;
        } else {
            this.forLast((el) => el.next = newEl);
        }
    }

    // Removes an item form the end of the list and returns it's value
    popBack(): T {
        let value: T;
        this.forEach(el => {
            // If there is only one element, reset the head
            if (el.next == null) {
                value = el.value;
                this.head.next = null;
                return true;
            } else if (el.next.next == null) {
                // If we are at the second last element, remove its child
                value = el.next.value;
                el.next = null;
                return true;
            }
        });
        return value;
    }

    // Gets the value of the front item
    front(): T {
        return this.head.next ?
            this.head.next.value :
            null;
    }

    // Gets the value of the last item in the list
    back(): T {
        let value: T;
        this.forLast(el => value = el.value);
        return value;
    }

    // Inserts an item into the list at an arbitrary index
    insertAt(index: number, value: T) {
        if (index < 0) {
            throw new Error('Cannot insert at a negative index');
        }

        this.ForEachIncludingHead((el, i) => {
            if (i === index - 1) {
                el.next = new Element(value, el.next);
                return true;
            } else if (el.next == null) {
                throw new Error(`Cannot insert value ${value} at index ${index}: Out of bounds. Current Size: ${i}`);
            }
        });
    }

    // Removes an item at an arbitrary index
    removeAt(index: number): T {
        let value: T;
        this.forEach((el, i) => {
            if (i === index - 1 && el.next) {
                value = el.next.value;
                el.next = el.next.next;
                return true;
            }
        });
        return value;
    }

    // Returns a list with the elements in reverse order
    reverse(): void {
        let currentEl: Element<T> = null;

        this.forEach(el => {
            currentEl = new Element(el.value, currentEl);
        });

        this.head = new Element(null, currentEl);
    }

    // Returns a list containing only values that match a predicate
    filter(predicate: {(value: T): boolean}): void {
        return this.ForEachIncludingHead(el => {
            if (el.next &&
                !predicate(el.next.value)
            ) {
                el.next = el.next.next;
            }
        });
    }
}
