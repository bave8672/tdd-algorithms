import { Hasher } from '../src/structures/hashes/hasher';

const hasher = new Hasher();

const func = (x: any) => {
    return hasher.hash(x);
};

const arr = [1, 2, 3, [4, 5, 6], 'stringy'];

const object = {
    foo: 'stringy',
    bar: 123123123,
    baz: {
        nestedFn: () => { console.log('wow'); },
        Kill: 'Bill'
    }
};

describe('Hasher', () => {

    it('Can hash a string', () => {
        expect(typeof hasher.hash('Hello world!!!')).toBe('number');
    });

    it('can hash a number', () => {
        expect(typeof hasher.hash(123456)).toBe('number');
    });

    it('can hash an object', () => {
        expect(typeof hasher.hash(hasher)).toBe('number');
    });

    it('can hash a function', () => {
        expect(typeof hasher.hash(func)).toBe('number');
    });

    it('can hash an array', () => {
        expect(typeof hasher.hash(arr)).toBe('number');
    });

    it('can hash a nested object', () => {
        expect(typeof hasher.hash(object)).toBe('number');
    });

    it('Hashes values consistently', () => {
        expect(hasher.hash('Hello world!!!')).toBe(hasher.hash('Hello world!!!'));
        expect(hasher.hash(123456)).toBe(hasher.hash(123456));
        expect(hasher.hash(arr)).toBe(hasher.hash(arr));
        expect(hasher.hash(object)).toBe(hasher.hash(object));
    });
});
