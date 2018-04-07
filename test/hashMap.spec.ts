import { Hasher } from '../src/structures/hashes/Hasher';
import { HashMap } from '../src/structures/hashes/hashMap';

const map = new HashMap<any>(new Hasher());

describe('HashMap', () => {
    it('Can add values', () => {
        map.add('one');
        map.add('two');
        map.add('three');
    });

    it('Can remove values', () => {
        map.remove('two');
    });

    it('Can tell if values are mapped', () => {
        expect(map.contains('one')).toBe(true);
        expect(map.contains('two')).toBe(false);
        expect(map.contains('xxxxxxxxxxx')).toBe(false);
    });

    it('Can remove values that are not there and not complain', () => {
        map.remove('two');
        expect(map.contains('two')).toBe(false);
    });

    it('Can add multiples of a value', () => {
        map.add('one');
        expect(map.contains('one')).toBe(true);
    });

    it('Can add remove a value that has been added more than once', () => {
        map.remove('one');
        expect(map.contains('one')).toBe(true);
    });
});
