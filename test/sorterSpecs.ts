import { SorterPrototype } from './algorithms/sorting/ISorter';

export function runSorterSpecs(Sorter: SorterPrototype): void {
    describe(Sorter.name, () => {
        it('can sort an arbitrary list', () => {
            const sorter = new Sorter<number>((a, b) => a < b);

            expect(sorter.sort([3, 2, 1])).toEqual([1, 2, 3]);
            expect(sorter.sort([4, 2, 6, 3, 8, 9, 7, 1, 5, -1, 0])).toEqual([
                -1,
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
            ]);
        });

        it('can sort an empty list', () => {
            const sorter = new Sorter<number>((a, b) => a < b);

            expect(sorter.sort([])).toEqual([]);
        });

        it('Can sort other values', () => {
            const stringSorter = new Sorter<string>((a, b) => a < b);
            expect(stringSorter.sort(['x', 'y', 'a', 'b'])).toEqual([
                'a',
                'b',
                'x',
                'y',
            ]);

            const boolSorter = new Sorter<boolean>((a, b) => a < b);
            expect(
                boolSorter.sort([true, false, false, false, true, true]),
            ).toEqual([false, false, false, true, true, true]);
        });
    });
}
