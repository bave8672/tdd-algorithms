import { FixedArray } from '../src/structures/arrays/array/fixedArray';

describe('a Fixed Array', () => {
    let array: FixedArray<string>;

    beforeEach(() => (array = new FixedArray<string>(1024)));

    it('Can set values', () => {
        array.set(0, 'zero');
        array.set(2, 'one');
        array.set(1023, '1023');
    });

    it('Throws an error when trying to set out of bounds indices', () => {
        expect(() => array.set(-1)).toThrow();
        expect(() => array.set(1024)).toThrow();
    });

    it('Can read values', () => {
        array.set(0, 'zero');
        expect(array.get(0)).toBe('zero');
        expect(array.get(0)).toBe('zero');
    });

    it('is initialized with undefined by default', () => {
        expect(array.get(0)).toBeUndefined();
    });

    it('can initialise itself with a value', () => {
        const helloArray = new FixedArray<string>(32, 'Hello');
        for (let i = 0; i < 32; i++) {
            expect(helloArray.get(i)).toBe('Hello');
        }
    });
});
