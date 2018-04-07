import { IElement } from './IElement';

export class Element<T> implements IElement<T> {
    value: T;
    next: IElement<T>;

    constructor(value: T, next: IElement<T> = null) {
        this.value = value;
        this.next = next;
    }
}
