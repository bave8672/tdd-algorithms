import { unorderedSearch } from '../../searching/unorderedSearch';
import { Node } from '../Node';

/**
 * Classic implementation of Djikstra's Algorithm without using a priority queue
 */
export function naiiveDjikstra(nodes: Node[], source: Node): Node[] {
    // Add tentative distances to nodes
    nodes.forEach(node => (node.distance = Number.POSITIVE_INFINITY));
    source.distance = 0;
    // Keep track of unvisited nodes in a set
    const unvisited = new Set(nodes);
    let current = source;
    // iterate until all nodes are visited
    while (unvisited.size > 0) {
        const edges = current.edges.filter(edge => unvisited.has(edge.node));
        // minimise the distance for each neighbour
        edges.forEach(
            edge =>
                (edge.node.distance = Math.min(
                    edge.node.distance,
                    edge.length + current.distance,
                )),
        );
        // mark node as visited
        unvisited.delete(current);
        // next node is either the neighbour with the smallest distance,
        // or the next unvisited node with the smallest distance
        current = unorderedSearch(
            edges.length > 0 ? edges.map(e => e.node) : Array.from(unvisited),
            (a, b) => a.distance < b.distance,
        );
    }
    return nodes;
}
