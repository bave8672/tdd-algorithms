export type SorterPrototype = new <T>(compareFn: (a: T, b: T) => boolean) => ISorter<T>;

export interface ISorter<T> {
    sort(list: T[]): T[];
}
