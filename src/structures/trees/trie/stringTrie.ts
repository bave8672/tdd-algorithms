import { GenericTrie } from './genericTrie';

export class Trie extends GenericTrie<string> {

    children: Array<Trie>;
    isTerminator: boolean;

    static from(word: string): Trie {
        if (word.length === 0) {
            return null;
        }
        let head = new Trie(word[0]);
        if (word.length > 1) {
            head.children.push(Trie.from(word.substr(1)));
        } else {
            head.isTerminator = true;
        }
        return head;
    }

    static fromArray(words: string[]): Trie {
        let head = new Trie(null);
        words.forEach(w => head.add(w));
        return head;
    }

    add(word: string): void {
        if (word.length === 0) {
            this.isTerminator = true;
            return;
        }
        let next: Trie = this.children.find(t => t.value === word[0]);
        if (!next) {
            next = new Trie(word[0]);
            this.children.push(next);
        }
        return next.add(word.substr(1));
    }

    remove(word: string): Trie {
        let prevNode: Trie;
        let currentnode: Trie = this;
        let nodeToDeleteFrom: Trie;
        let charToDeleteFrom: string;
        for (let i = 0; i < word.length; i++) {
            currentnode = currentnode.children.find(c => c.value === word[i]);
            if (!currentnode) {
                return;
            }
            if (i !== 0 &&
                currentnode.children.length === 1 &&
                nodeToDeleteFrom == null &&
                !currentnode.isTerminator) {
                nodeToDeleteFrom = prevNode;
                charToDeleteFrom = currentnode.value;
            }
            if (currentnode.children.length > 1) {
                nodeToDeleteFrom = null;
            }
            prevNode = currentnode;
        }
        if (currentnode.children.length > 0) {
            currentnode.isTerminator = false;
            return;
        }
        nodeToDeleteFrom.children = nodeToDeleteFrom.children.filter(c => c.value !== charToDeleteFrom);
    }

    find(word: string): Trie {
        if (word.length === 0) {
            return this;
        }
        let next = this.children.find(t => t.value === word[0]);
        if (!next) {
            return null;
        }
        return next.find(word.substr(1));
    }

    findStrict(word: string): Trie {
        const found = this.find(word);
        if (found && found.isTerminator) {
            return found;
        }
        return null;
    }

    allWords(prefix = ''): string[] {
        let words: string[] = [];
        let newPrefix = this.value ? prefix + this.value : '';
        if (this.isTerminator) {
            words.push(newPrefix);
        }
        this.children.forEach(c => words = words.concat(c.allWords(newPrefix)));
        return words;
    }

    wordsStartingWith(word: string): string[] {
        return this.find(word).allWords(word.substr(0, word.length - 1));
    }
}
