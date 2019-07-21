export class Hasher {
    hash(x: any): number {
        if (
            typeof x === 'string' ||
            typeof x === 'number' ||
            typeof x === 'object'
        ) {
            return this.hashObj(x);
        }
        if ('toString' in x) {
            return this.hashObj(x.toString());
        }
        throw new Error('Cannot hash this');
    }

    hashObj(obj: any, mod = 1000000): number {
        const hash =
            JSON.stringify(obj)
                .split('')
                .map(c => Number.parseInt(c, 36))
                .map(n => (isNaN(n) ? 0 : n))
                .reduce((a, b, i) => a + (i % 2 ? b * 411 : b), 0) % mod;

        return hash;
    }
}
