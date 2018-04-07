import { Trie } from './genericTrie';

export class StringTrie extends Trie<string> {
    public static from(word: string): StringTrie {
        if (word.length === 0) {
            return null;
        }
        const head = new StringTrie(word[0]);
        if (word.length > 1) {
            head.children.push(StringTrie.from(word.substr(1)));
        } else {
            head.isTerminator = true;
        }
        return head;
    }

    public static fromArray(words: string[]): StringTrie {
        const head = new StringTrie(null);
        words.forEach(w => head.add(w));
        return head;
    }

    public children: StringTrie[];
    public isTerminator: boolean;

    public add(word: string): void {
        if (word.length === 0) {
            this.isTerminator = true;
            return;
        }
        let next: StringTrie = this.children.find(t => t.value === word[0]);
        if (!next) {
            next = new StringTrie(word[0]);
            this.children.push(next);
        }
        return next.add(word.substr(1));
    }

    public remove(word: string): StringTrie {
        let prevNode: StringTrie;
        let currentnode: StringTrie = this;
        let nodeToDeconsteFrom: StringTrie;
        let charToDeconsteFrom: string;
        for (let i = 0; i < word.length; i++) {
            currentnode = currentnode.children.find(c => c.value === word[i]);
            if (!currentnode) {
                return;
            }
            if (
                i !== 0 &&
                currentnode.children.length === 1 &&
                nodeToDeconsteFrom == null &&
                !currentnode.isTerminator
            ) {
                nodeToDeconsteFrom = prevNode;
                charToDeconsteFrom = currentnode.value;
            }
            if (currentnode.children.length > 1) {
                nodeToDeconsteFrom = null;
            }
            prevNode = currentnode;
        }
        if (currentnode.children.length > 0) {
            currentnode.isTerminator = false;
            return;
        }
        nodeToDeconsteFrom.children = nodeToDeconsteFrom.children.filter(
            c => c.value !== charToDeconsteFrom,
        );
    }

    find(word: string): StringTrie {
        if (word.length === 0) {
            return this;
        }
        const next = this.children.find(t => t.value === word[0]);
        if (!next) {
            return null;
        }
        return next.find(word.substr(1));
    }

    findStrict(word: string): StringTrie {
        const found = this.find(word);
        if (found && found.isTerminator) {
            return found;
        }
        return null;
    }

    allWords(prefix = ''): string[] {
        let words: string[] = [];
        const newPrefix = this.value ? prefix + this.value : '';
        if (this.isTerminator) {
            words.push(newPrefix);
        }
        this.children.forEach(
            c => (words = words.concat(c.allWords(newPrefix))),
        );
        return words;
    }

    wordsStartingWith(word: string): string[] {
        return this.find(word).allWords(word.substr(0, word.length - 1));
    }
}
