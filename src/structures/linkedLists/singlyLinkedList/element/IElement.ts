export interface IElement<T> {
    value: T;
    next: IElement<T>;
}
