import { MergeSort } from '../src/algorithms/sorting/mergeSort/mergeSort';

describe('MergeSorter', () => {
    it('can merge two sorted lists', () => {
        const sorter = new MergeSort<number>((a, b) => a < b);

        expect(sorter.merge([1, 3, 5, 7], [2, 4, 6, 8])).toEqual([
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
        ]);

        expect(sorter.merge([1, 100], [2, 4, 6, 6])).toEqual([
            1,
            2,
            4,
            6,
            6,
            100,
        ]);

        expect(sorter.merge([2, 4, 6, 6], [1, 100])).toEqual([
            1,
            2,
            4,
            6,
            6,
            100,
        ]);
    });

    it('can merge two empty lists', () => {
        const sorter = new MergeSort<number>((a, b) => a < b);

        expect(sorter.merge([], [])).toEqual([]);
    });
});
