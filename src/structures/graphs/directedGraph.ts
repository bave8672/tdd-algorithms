/** Represents nodes & vertices in a single structure */
export class DirectedGraphVertex<T = unknown> {
    constructor(
        public value: T,
        /** Outbound edges point towards these vertices */
        public outbound: Set<DirectedGraphVertex> = new Set(),
        /** Inbound edges point towards this from these vertices */
        public inbound: Set<DirectedGraphVertex> = new Set()
    ) {}

    /** Helper to add an edge from this that */
    addEdge(vertex: DirectedGraphVertex) {
        this.outbound.add(vertex);
        vertex.inbound.add(this);
    }

    /** Helper to remove an edge from this that */
    removeEdge(vertex: DirectedGraphVertex) {
        this.outbound.delete(vertex);
        vertex.inbound.delete(this);
    }
}

/** Helper to wire up nodes & vertices into a single data structure */
export function createDirectedGraph(vertices: DirectedGraphVertex[], edges: [DirectedGraphVertex, DirectedGraphVertex][]): DirectedGraphVertex[] {
    for (const [from, to] of edges) {
        from.addEdge(to);
    }
    return vertices;
}

const charCodeA = 'A'.charCodeAt(0);

/** Helper to create lots of vertices */
export function createVertices(count: number): DirectedGraphVertex[] {
    const vertices: DirectedGraphVertex[] = [];
    for (let i = 0; i < count; i++) {
        vertices.push(new DirectedGraphVertex(String.fromCharCode(charCodeA + i)));
    }
    return vertices;
}
