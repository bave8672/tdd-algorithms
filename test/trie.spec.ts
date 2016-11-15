import { Trie } from '../src/structures/trees/trie/stringTrie';

describe('String Trie', () => {

    let trie: Trie;
    const words = [
        'angus',
        'angela',
        'arjun',
        'amanda',
        'amazing'];

    beforeEach(() => {
        trie = Trie.fromArray(words);
    });

    it('Can add words and find them', () => {
        words.forEach(w => {
            expect(trie.find(w).value).toBe(w.charAt(w.length - 1));
            expect(trie.findStrict(w).value).toBe(w.charAt(w.length - 1));
        });
    });

    it('Can find all of the words beginning with a string', () => {
        let wordsStartingWithAn = trie.wordsStartingWith('an');
        expect(wordsStartingWithAn).toContain('angus');
        expect(wordsStartingWithAn).toContain('angela');
        expect(wordsStartingWithAn.length).toBe(2);
    });

    it('Can find nested words', () => {
        trie.add('an');

        let wordsStartingWithAn = trie.wordsStartingWith('an');
        expect(wordsStartingWithAn).toContain('angus');
        expect(wordsStartingWithAn).toContain('angela');
        expect(wordsStartingWithAn).toContain('an');
        expect(wordsStartingWithAn.length).toBe(3);
    });

    it('returns nothing when trying to find a word not in the trie', () => {
        expect(trie.find('amazingly')).toBeNull();
    });

    it('returns nothing when trying to find a word whose node exists but whose terminator has not been added', () => {
        expect(trie.findStrict('an')).toBeNull();
    });

    it('Doesn\'t duplicate when adding words', () => {
        trie.add('angela');

        let wordsStartingWithAn = trie.wordsStartingWith('an');
        expect(wordsStartingWithAn).toContain('angus');
        expect(wordsStartingWithAn).toContain('angela');
        expect(wordsStartingWithAn.length).toBe(2);
    });

    it('can add empty words', () => {
        trie.add('');

        let wordsStartingWithAn = trie.wordsStartingWith('an');
        expect(wordsStartingWithAn).toContain('angus');
        expect(wordsStartingWithAn).toContain('angela');
        expect(wordsStartingWithAn.length).toBe(2);
    });

    it('can remove words', () => {
        trie.remove('angela');

        let wordsStartingWithAn = trie.wordsStartingWith('an');
        expect(wordsStartingWithAn).toContain('angus');
        expect(wordsStartingWithAn.length).toBe(1);
    });

    it('can remove words that dont exist', () => {
        trie.remove('an');
        trie.remove('angry');

        let wordsStartingWithAn = trie.wordsStartingWith('an');
        expect(wordsStartingWithAn).toContain('angus');
        expect(wordsStartingWithAn).toContain('angela');
        expect(wordsStartingWithAn.length).toBe(2);
    });

    it('can create a new Trie from an array of words', () => {
        let t = Trie.fromArray(['one', 'two']);
        expect(t.allWords()).toContain('one');
        expect(t.allWords()).toContain('two');
        expect(t.allWords().length).toBe(2);
    });

    it('can create a new trie from a word', () => {
        let t = Trie.from('hello');
        expect(t.allWords()).toContain('hello');
        expect(t.allWords.length).toBe(1);
    });

    it('returns nothing if you try to create from an empty string', () => {
        expect(Trie.from('')).toBeNull();
    });
});
