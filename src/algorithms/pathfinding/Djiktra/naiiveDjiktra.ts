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
        const neighbours = current.neighbours.filter(node =>
            unvisited.has(node),
        );
        // minimise the distance for each neighbour
        neighbours.forEach(
            node =>
                (node.distance = Math.min(node.distance, 1 + current.distance)),
        );
        // mark node as visited
        unvisited.delete(current);
        // next node is either the neighbour with the smallest distance,
        // or the next unvisited node with the smallest distance
        current = unorderedSearch(
            neighbours.length > 0 ? neighbours : Array.from(unvisited),
            (a, b) => a.distance < b.distance,
        );
    }
    return nodes;
}
