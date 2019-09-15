import { FibonacciHeapPriorityQueue } from '../../../structures/queues/priorityQueue/fibonacciHeapPriorityQueue';
import { min } from '../../comparison/min';
import { Node } from '../Node';

/**
 * Implementation of Djikstra's search using a priority queue
 */
export function priorityQueueDjisktra(nodes: Node[], source: Node): Node[] {
    const queue = new FibonacciHeapPriorityQueue<Node>(
        min,
        Number.NEGATIVE_INFINITY,
    );
    // Add tentative distances to nodes
    nodes.forEach(node => {
        if (node === source) {
            node.distance = 0;
        } else {
            node.distance = Number.POSITIVE_INFINITY;
        }
        queue.insertWithPriority(node, node.distance);
    });
    // iterate until all nodes are visited
    while (!queue.isEmpty()) {
        const current = queue.pullHighestPriorityElement();
        const edges = current.edges.filter(edge => queue.contains(edge.node));
        // minimise the distance for each neighbour
        edges.forEach(edge => {
            const distance = Math.min(
                edge.node.distance,
                current.distance + edge.length,
            );
            if (distance < edge.node.distance) {
                edge.node.distance = distance;
                queue.increasePriority(edge.node, distance);
            }
        });
    }
    return nodes;
}
