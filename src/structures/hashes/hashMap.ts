export class HashMap<TValue> {

    private _map: {
        [index: number]: TValue[];
    } = {};

    constructor(
        private hasher: { hash: (value: TValue) => number }
    ) {
    }

    add(value: TValue) {
        const hash = this.hasher.hash(value);
        if (!this._map[hash]) {
            this._map[hash] = [];
        }
        this._map[hash].push(value);
    }

    remove(value: TValue) {
        const hash = this.hasher.hash(value);
        if (!this._map[hash]) {
            return;
        }
        let index = this._map[hash].findIndex(v => v === value || JSON.stringify(v) === JSON.stringify(value));
        if (index > -1) {
            this._map[hash].splice(index, 1);
        }
    }

    contains(value: TValue): boolean {
        const hash = this.hasher.hash(value);
        return !!this._map[hash]
            && this._map[hash].findIndex(v => v === value || JSON.stringify(v) === JSON.stringify(value)) > -1;
    }
}
