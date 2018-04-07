export class Trie<T> {
    constructor(public value: T, public children: Array<Trie<T>> = []) {}
}
