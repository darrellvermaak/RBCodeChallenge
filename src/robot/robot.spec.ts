
import { MapGrid } from '../map-grid/map-grid';
import { Robot } from './robot';
import { ScentHash } from '../scent-hash/scent-hash.type';
import { expect } from 'chai';

describe('Robot', () => {
    let mapGrid: MapGrid;
    let scentHash: ScentHash;
    let logSpy: any;

    beforeEach(() => {
        mapGrid = new MapGrid(`5 5`);
        scentHash = {};
    });

    it('initializes correctly with valid line', () => {
        const r = new Robot('1 2 N', mapGrid, scentHash);
    });

    it('throws error for malformed initialisation line', () => {
        expect(() => {
            new Robot('1 2', mapGrid, scentHash);
        }).to.throw('Invalid Robot Instruction File - robot initialisation must contain two space separated integers and a character representing the robots co-ordinates and orientation.');
    });

    it('throws error when initial coordinates are out of bounds', () => {
        expect(() => {
            new Robot('99 99 N', mapGrid, scentHash);
        }).to.throw('Initial coordinates are out of bounds of the map grid.');
    });

    it('throws error when initial orientation is invalid', () => {
        expect(() => {
            new Robot('1 1 X', mapGrid, scentHash);
        }).to.throw('Invalid initial orientation character.');
    });

    it('throws error for invalid command character in ProcessCommands', () => {
        const r = new Robot('1 2 N', mapGrid, scentHash);
        expect(() => {
            r.ProcessCommands('A');
        }).to.throw('Invalid command character A.');
    });

    it('correctly processes command characters in ProcessCommands - should return "1 2 W"', () => {
        const r = new Robot('1 2 N', mapGrid, scentHash);
        const originalLog = console.log;
        let logged = '';
        console.log = (...args: any[]) => { logged = args.join(' '); };
        try {
            r.ProcessCommands('FRFRFRF');
            expect(logged).to.equal('1 2 W');
        } finally {
            console.log = originalLog;
        }
    });

    it('correctly processes command characters in ProcessCommands - should return "1 2 E"', () => {
        const r = new Robot('1 2 N', mapGrid, scentHash);
        const originalLog = console.log;
        let logged = '';
        console.log = (...args: any[]) => { logged = args.join(' '); };
        try {
            r.ProcessCommands('FLFLFLF');
            expect(logged).to.equal('1 2 E');
        } finally {
            console.log = originalLog;
        }
    });

    it('correctly processes command characters in ProcessCommands - should return "0 2 W LOST"', () => {
        const r = new Robot('1 2 N', mapGrid, scentHash);
        const originalLog = console.log;
        let logged = '';
        console.log = (...args: any[]) => { logged = args.join(' '); };
        try {
            r.ProcessCommands('FRFRFRFFF');
            expect(logged).to.equal('0 2 W LOST');
        } finally {
            console.log = originalLog;
        }
    });

    it('correctly processes command characters in ProcessCommands - should return "0 2 W"', () => {
        const r = new Robot('1 2 N', mapGrid, scentHash);
        scentHash['0:2'] = 'W';
        const originalLog = console.log;
        let logged = '';
        console.log = (...args: any[]) => { logged = args.join(' '); };
        try {
            r.ProcessCommands('FRFRFRFFF');
            expect(logged).to.equal('0 2 W');
        } finally {
            console.log = originalLog;
        }
    });

    it('correctly processes command characters in ProcessCommands - should return "0 0 S LOST"', () => {
        const r = new Robot('0 0 S', mapGrid, scentHash);
        const originalLog = console.log;
        let logged = '';
        console.log = (...args: any[]) => { logged = args.join(' '); };
        try {
            r.ProcessCommands('FRFRFRFFF');
            expect(logged).to.equal('0 0 S LOST');
        } finally {
            console.log = originalLog;
        }
    });

    it('correctly processes command characters in ProcessCommands - should return "5 5 N LOST"', () => {
        const r = new Robot('5 5 N', mapGrid, scentHash);
        const originalLog = console.log;
        let logged = '';
        console.log = (...args: any[]) => { logged = args.join(' '); };
        try {
            r.ProcessCommands('FRFRFRFFF');
            expect(logged).to.equal('5 5 N LOST');
        } finally {
            console.log = originalLog;
        }
    });

    it('correctly processes command characters in ProcessCommands - should return "5 5 E LOST"', () => {
        const r = new Robot('5 5 N', mapGrid, scentHash);
        const originalLog = console.log;
        let logged = '';
        console.log = (...args: any[]) => { logged = args.join(' '); };
        try {
            r.ProcessCommands('RFRFRFFF');
            expect(logged).to.equal('5 5 E LOST');
        } finally {
            console.log = originalLog;
        }
    });


});
