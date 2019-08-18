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
        const neighbours = current.neighbours.filter(node =>
            queue.contains(node),
        );
        // minimise the distance for each neighbour
        neighbours.forEach(neighbour => {
            const distance = Math.min(neighbour.distance, 1 + current.distance);
            if (distance < neighbour.distance) {
                neighbour.distance = distance;
                queue.increasePriority(neighbour, distance);
            }
        });
    }
    return nodes;
}