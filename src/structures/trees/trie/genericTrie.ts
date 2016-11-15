export class GenericTrie<T> {

    constructor(
        public value: T,
        public children: GenericTrie<T>[] = []
    ) {
    }
}
