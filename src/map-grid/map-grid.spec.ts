import { expect } from 'chai';
import 'mocha';
import { MapGrid } from './map-grid';

const X = 5;
const Y = 10;

describe('MapGrid', () => {
    it('constructs with given width and height', () => {
        let grid = new MapGrid(`${X} ${Y}`);
        expect(grid.x).to.equal(X);
        expect(grid.y).to.equal(Y);
    });

    it('throws error for invalid grid dimensions', () => {
        expect(() => new MapGrid('')).to.throw('Invalid Robot Instruction File - first line must contain two space separated integers representing grid dimensions.');
        expect(() => new MapGrid('5')).to.throw('Invalid Robot Instruction File - first line must contain two space separated integers representing grid dimensions.');
        expect(() => new MapGrid('51 10')).to.throw('Map grid dimensions must be between 0 and 50.');
        expect(() => new MapGrid('10 60')).to.throw('Map grid dimensions must be between 0 and 50.');
        expect(() => new MapGrid('-1 10')).to.throw('Map grid dimensions must be between 0 and 50.');
    });
});