import { CircularBuffer } from '../src/structures/arrays/circularBuffer/circularBuffer';

describe('CircularBuffer', () => {

    it('Can be intialised', () => {
        const buffer = new CircularBuffer(10);
    });

    it('Has a size', () => {
        const bitBuffer = new CircularBuffer(1);
        expect(bitBuffer.size).toBe(1);

        const byteBuffer = new CircularBuffer(4);
        expect(byteBuffer.size).toBe(4);
    });

    it('Is not full on initialisation', () => {
        const bitBuffer = new CircularBuffer(1);
        expect(bitBuffer.isFull).toBe(false);

        const byteBuffer = new CircularBuffer(4);
        expect(byteBuffer.isFull).toBe(false);
    });

    it('Can write values', () => {
        const buffer = new CircularBuffer(4);
        buffer.write(1);
        buffer.write(2);
        buffer.write(3);
        buffer.write(4);
    });

    it('Can read values', () => {
        const buffer = new CircularBuffer(4);
        buffer.write(1);
        buffer.write(2);
        buffer.write(3);
        buffer.write(4);

        expect(buffer.read()).toBe(1);
        expect(buffer.read()).toBe(2);
        expect(buffer.read()).toBe(3);
        expect(buffer.read()).toBe(4);
    });

    it('Runs out of memory accordig to it\'s size', () => {
        const buffer = new CircularBuffer(4);

        buffer.write(1);
        buffer.write(2);
        buffer.write(3);
        buffer.write(4);
        buffer.write(5); // Not written

        expect(buffer.read()).toBe(1);
        expect(buffer.read()).toBe(2);
        expect(buffer.read()).toBe(3);
        expect(buffer.read()).toBe(4);
        expect(buffer.read()).toBe(null); // No value written yet

        buffer.write(1);
        expect(buffer.read()).toBe(1);
    });
});
