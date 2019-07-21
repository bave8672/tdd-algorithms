/**
 * https://en.wikipedia.org/wiki/Binary_tree#Nodes_and_references
 */
export class ReferenceBinaryTree<T> {
    public head?: Node<T>;
}

export interface Node<T> {
    value: T;
    left?: Node<T>;
    right?: Node<T>;
}
