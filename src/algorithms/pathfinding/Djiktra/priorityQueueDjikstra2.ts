import { FibonacciHeapPriorityQueue2 } from '../../../structures/queues/priorityQueue/fibonacciHeapPriorityQueue2';
import { Node } from '../Node';

/**
 * Implementation of Djikstra's search using a priority queue
 */
export function priorityQueueDjisktra2(nodes: Node[], source: Node): Node[] {
    const queue = new FibonacciHeapPriorityQueue2<Node>(
        (a, b) => a.key - b.key,
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
        edges.forEach(neighbour => {
            const distance = Math.min(
                neighbour.node.distance,
                current.distance + neighbour.length,
            );
            if (distance < neighbour.node.distance) {
                neighbour.node.distance = distance;
                queue.increasePriority(neighbour.node, distance);
            }
        });
    }
    return nodes;
}
