export interface Node {
    distance?: number;
    edges: Edge[];
}

export interface Edge {
    length: number;
    node: Node;
}
