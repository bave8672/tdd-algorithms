export class HashMap<TValue> {
    private map: {
        [index: number]: TValue[];
    } = {};

    constructor(private hasher: { hash: (value: TValue) => number }) {}

    add(value: TValue) {
        const hash = this.hasher.hash(value);
        if (!this.map[hash]) {
            this.map[hash] = [];
        }
        this.map[hash].push(value);
    }

    remove(value: TValue) {
        const hash = this.hasher.hash(value);
        if (!this.map[hash]) {
            return;
        }
        const index = this.map[hash].findIndex(
            v => v === value || JSON.stringify(v) === JSON.stringify(value),
        );
        if (index > -1) {
            this.map[hash].splice(index, 1);
        }
    }

    contains(value: TValue): boolean {
        const hash = this.hasher.hash(value);
        return (
            !!this.map[hash] &&
            this.map[hash].findIndex(
                v => v === value || JSON.stringify(v) === JSON.stringify(value),
            ) > -1
        );
    }
}
