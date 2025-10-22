import { expect } from 'chai';
import type { MapGridCoordinates } from './map-grid.type';

describe('MapGridCoordinates type', () => {
    it('is an object with numeric x and y', () => {
        const coords: MapGridCoordinates = { x: 5, y: 10 };
        expect(coords).to.be.an('object');
        expect(coords).to.have.property('x').that.is.a('number');
        expect(coords).to.have.property('y').that.is.a('number');
    });

    it('accepts zero, negative and floating numbers', () => {
        const samples: MapGridCoordinates[] = [
            { x: 0, y: 0 },
            { x: -3, y: 7.5 },
            { x: Number.MAX_SAFE_INTEGER, y: -Number.MAX_VALUE },
        ];
        samples.forEach((s) => {
            expect(s.x).to.be.a('number');
            expect(s.y).to.be.a('number');
        });
    });

    it('serializes to JSON with x and y keys', () => {
        const coords: MapGridCoordinates = { x: 1, y: 2 };
        const json = JSON.stringify(coords);
        expect(json).to.equal('{"x":1,"y":2}');
    });

    it('has exactly two keys: x and y', () => {
        const coords: MapGridCoordinates = { x: 9, y: 8 };
        const keys = Object.keys(coords);
        expect(keys).to.have.members(['x', 'y']);
        expect(keys).to.have.length(2);
    });

    it('can be copied and mutated independently', () => {
        const original: MapGridCoordinates = { x: 1, y: 2 };
        const copy = { ...original };
        copy.x = 42;
        expect(original.x).to.equal(1);
        expect(copy.x).to.equal(42);
    });
});