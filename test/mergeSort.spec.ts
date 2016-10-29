import { MergeSorter } from '../src/algorithms/sorting/mergeSort/mergeSort';

describe('MergeSorter', () => {

    it('can be instanciated', () => {
        let sorter = new MergeSorter((a, b) => true);
    });

    it('can merge two sorted lists', () => {
        let sorter = new MergeSorter((a, b) => a <= b);

        expect(sorter.merge([1, 3, 5, 7], [2, 4, 6, 8]))
            .toEqual([1, 2, 3, 4, 5, 6, 7, 8]);

        expect(sorter.merge([1, 100], [2, 4, 6, 6]))
            .toEqual([1, 2, 4, 6, 6, 100]);

        expect(sorter.merge([2, 4, 6, 6], [1, 100]))
            .toEqual([1, 2, 4, 6, 6, 100]);
    });

    it('can merge two empty lists', () => {
        let sorter = new MergeSorter((a, b) => a <= b);

        expect(sorter.merge([], [])).toEqual([]);
    });

    it('can sort an arbitrary list', () => {
        let sorter = new MergeSorter((a, b) => a <= b);

        expect(sorter.sort([3, 2, 1])).toEqual([1, 2, 3]);
        expect(sorter.sort([4, 2, 6, 3, 8, 9, 7, 1, 5, -1, 0]))
            .toEqual([-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('can sort an empty list', () => {
        let sorter = new MergeSorter((a, b) => a <= b);

        expect(sorter.sort([])).toEqual([]);
    });

    it('Can sort other values', () => {
        let stringSorter = new MergeSorter<string>();
        expect(stringSorter.sort(['x', 'y', 'a', 'b'])).toEqual(['a', 'b', 'x', 'y']);

        let boolSorter = new MergeSorter<boolean>();
        expect(boolSorter.sort([true, false, false, false, true, true]))
            .toEqual([false, false, false, true, true, true]);
    });
});
