import {
    naiiveDjikstra,
    Node,
} from '../src/algorithms/pathfinding/Djiktra/naiiveDjiktra';

describe(`Djikstra family algorithms`, () => {
    it('should add distances to a grid of nodes base', () => {
        const grid = makeGrid(1, 1);
        expect(gridDistances(naiiveDjikstra(grid, grid[0]), 1)).toEqual([[0]]);
    });

    it('should add distances to a grid of nodes 1', () => {
        const grid = makeGrid(2, 2);
        expect(gridDistances(naiiveDjikstra(grid, grid[0]), 2)).toEqual([
            [0, 1],
            [1, 1],
        ]);
    });

    it('should add distances to a grid of nodes 2', () => {
        const grid = makeGrid(2, 2);
        expect(gridDistances(naiiveDjikstra(grid, grid[3]), 2)).toEqual([
            [1, 1],
            [1, 0],
        ]);
    });

    it('should add distances to a grid of nodes 2', () => {
        const grid = makeGrid(3, 3);
        expect(gridDistances(naiiveDjikstra(grid, grid[4]), 3)).toEqual([
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1],
        ]);
    });
});

function makeGrid(width: number, height: number): Node[] {
    const nodes: Node[] = [];
    for (let i = 0; i < width * height; i++) {
        nodes.push({ neighbours: [] });
    }
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            const node = nodes[i + j * height];
            for (
                let neighbourI = Math.max(0, i - 1);
                neighbourI <= Math.min(width - 1, i + 1);
                neighbourI++
            ) {
                for (
                    let neighbourJ = Math.max(0, j - 1);
                    neighbourJ <= Math.min(height - 1, j + 1);
                    neighbourJ++
                ) {
                    if (neighbourI !== i || neighbourJ !== j) {
                        node.neighbours.push(
                            nodes[neighbourI + height * neighbourJ],
                        );
                    }
                }
            }
        }
    }
    return nodes;
}

function gridify<T>(list: T[], height: number): T[][] {
    const grid: T[][] = [];
    while (list.length > 0) {
        grid.push(list.splice(0, height));
    }
    return grid;
}

function gridDistances(nodes: Node[], height: number): number[][] {
    return gridify(nodes.map(n => n.distance!), height);
}
