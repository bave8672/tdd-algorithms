import { StringTrie } from '../src/structures/trees/trie/stringTrie';

describe('String Trie', () => {
    let trie: StringTrie;
    const words = ['angus', 'angela', 'arjun', 'amanda', 'amazing'];

    beforeEach(() => {
        trie = StringTrie.fromArray(words);
    });

    it('Can add words and find them', () => {
        words.forEach(w => {
            expect(trie.find(w).value).toBe(w.charAt(w.length - 1));
            expect(trie.findStrict(w).value).toBe(w.charAt(w.length - 1));
        });
    });

    it('Can find all of the words beginning with a string', () => {
        const wordsStartingWithAn = trie.wordsStartingWith('an');
        expect(wordsStartingWithAn).toContain('angus');
        expect(wordsStartingWithAn).toContain('angela');
        expect(wordsStartingWithAn.length).toBe(2);
    });

    it('Can find nested words', () => {
        trie.add('an');

        const wordsStartingWithAn = trie.wordsStartingWith('an');
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

    it(`Doesnt duplicate when adding words`, () => {
        trie.add('angela');

        const wordsStartingWithAn = trie.wordsStartingWith('an');
        expect(wordsStartingWithAn).toContain('angus');
        expect(wordsStartingWithAn).toContain('angela');
        expect(wordsStartingWithAn.length).toBe(2);
    });

    it('can add empty words', () => {
        trie.add('');

        const wordsStartingWithAn = trie.wordsStartingWith('an');
        expect(wordsStartingWithAn).toContain('angus');
        expect(wordsStartingWithAn).toContain('angela');
        expect(wordsStartingWithAn.length).toBe(2);
    });

    it('can remove words', () => {
        trie.remove('angela');

        const wordsStartingWithAn = trie.wordsStartingWith('an');
        expect(wordsStartingWithAn).toContain('angus');
        expect(wordsStartingWithAn.length).toBe(1);
    });

    it('can remove words that don\'t exist', () => {
        trie.remove('an');
        trie.remove('angry');

        const wordsStartingWithAn = trie.wordsStartingWith('an');
        expect(wordsStartingWithAn).toContain('angus');
        expect(wordsStartingWithAn).toContain('angela');
        expect(wordsStartingWithAn.length).toBe(2);
    });

    it('can create a new Trie from an array of words', () => {
        const t = StringTrie.fromArray(['one', 'two']);
        expect(t.allWords()).toContain('one');
        expect(t.allWords()).toContain('two');
        expect(t.allWords().length).toBe(2);
    });

    it('can create a new trie from a word', () => {
        const t = StringTrie.from('hello');
        expect(t.allWords()).toContain('hello');
        expect(t.allWords().length).toBe(1);
    });

    it('returns nothing if you try to create from an empty string', () => {
        expect(StringTrie.from('')).toBeNull();
    });
});
