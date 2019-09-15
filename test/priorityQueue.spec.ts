import { FibonacciHeapPriorityQueue } from '../src/structures/queues/priorityQueue/fibonacciHeapPriorityQueue';

describe('priority queue', () => {
    it('should be empty initially', () => {
        const pq = new FibonacciHeapPriorityQueue<any>();
        expect(pq.isEmpty()).toBe(true);
    });

    it('should add items and remove them in order', () => {
        const pq = new FibonacciHeapPriorityQueue<any>();
        pq.insertWithPriority('medium important', 5);
        pq.insertWithPriority('very important', 10);
        pq.insertWithPriority('not important', 1);

        expect(pq.pullHighestPriorityElement()).toBe('very important');
        expect(pq.pullHighestPriorityElement()).toBe('medium important');

        pq.insertWithPriority('very very important', 100);

        expect(pq.pullHighestPriorityElement()).toBe('very very important');
        expect(pq.pullHighestPriorityElement()).toBe('not important');

        expect(pq.isEmpty()).toBe(true);
    });
});
