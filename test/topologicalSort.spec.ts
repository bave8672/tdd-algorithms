import { KahnsTompologicalSort } from "../src/algorithms/sorting/topological/topologicalSort"
import { createDirectedGraph, createVertices } from "../src/structures/graphs/directedGraph";

describe('Topological Sort', () => {
    const sorter = new KahnsTompologicalSort();
    const { sort } = sorter;

    it('Can handle an empty set', () => {
        expect(sort([])).toEqual([]);
    });

    it('Can handle a single node', () => {
        const [A] = createVertices(1);
        expect(sort([A])).toEqual([A]);
    });

    it('Can handle a graph with no edges', () => {
        const [A, B, C] = createVertices(3);
        expect(sort([A, B, C])).toEqual([A, B, C]);
    });

    it('Can sort a trivial two node graph 1', () => {
        const [A, B] = createVertices(2);
        createDirectedGraph([A, B], [[A, B]]);
        expect(sort([A, B])).toEqual([A, B]);
    });

    it('Can sort a trivial two node graph 2', () => {
        const [A, B] = createVertices(2);
        createDirectedGraph([A, B], [[A, B]]);
        expect(sort([B, A])).toEqual([A, B]);
    });

    it('Can sort a trivial three node graph 1', () => {
        const [A, B, C] = createVertices(3);
        createDirectedGraph([A, B, C], [[A, B], [B, C]]);
        expect(sort([A, B, C])).toEqual([A, B, C]);
    });

    it('Can sort a trivial three node graph 2', () => {
        const [A, B, C] = createVertices(3);
        createDirectedGraph([A, B, C], [[A, B], [B, C]]);
        expect(sort([B, C, A])).toEqual([A, B, C]);
    });

    it('Can sort a trivial three node graph 3', () => {
        const [A, B, C] = createVertices(3);
        createDirectedGraph([A, B, C], [[A, B], [B, C]]);
        expect(sort([C, A, B])).toEqual([A, B, C]);
    });

    it('Can sort a trivial three node graph 4', () => {
        const [A, B, C] = createVertices(3);
        createDirectedGraph([A, B, C], [[A, B], [B, C]]);
        expect(sort([C, B, A])).toEqual([A, B, C]);
    });

    it('Can sort an eight node graph', () => {
        /**
         * A B C
         * |/|/|
         * D E |
         * |\| |
         * F G H 
         */
        const [A, B, C, D, E, F, G, H] = createVertices(8);
        createDirectedGraph([A, B, C, D, E, F, G, H], [[A, D], [B, D], [B, E], [C, E], [C, H], [D, F], [D, G], [E, G]]);
        expect(sort([A, B, C, D, E, F, G, H])).toEqual([A, B, C, D, E, H, F, G]);
    });
});
