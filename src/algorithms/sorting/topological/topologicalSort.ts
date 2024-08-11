import { DirectedGraphVertex } from "../../../structures/graphs/directedGraph";
import { ISorter } from "../ISorter";

export class KahnsTompologicalSort implements ISorter<DirectedGraphVertex> {
    sort(list: DirectedGraphVertex[]): DirectedGraphVertex[] {
        const sortedList: DirectedGraphVertex[] = [];
        const verticesWithNoIncomingEdges: DirectedGraphVertex[] = list.filter(v => v.inbound.size === 0);
        while (verticesWithNoIncomingEdges.length) {
            const vertex = verticesWithNoIncomingEdges.shift();
            sortedList.push(vertex);
            for (const nextVertex of vertex.outbound) {
                vertex.removeEdge(nextVertex);
                if (nextVertex.inbound.size === 0) {
                    verticesWithNoIncomingEdges.push(nextVertex);
                }
            }
        }
        if (sortedList.length !== list.length) {
            throw new Error(`Graph has at least one cycle: ${JSON.stringify({ list, sortedList })}`);
        }
        return sortedList;
    }
}