import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { RobotOrchestrator } from './robot-orchestrator';
import { MapGrid } from '../map-grid/map-grid';
import { Robot } from '../robot/robot';

describe('RobotOrchestrator', () => {
    let orchestrator: RobotOrchestrator;

    beforeEach(() => {
        orchestrator = new RobotOrchestrator();
    });

    it('should set mapGrid on first non-empty line', () => {
        orchestrator.ProcessLine('5 3');
        const mapGrid = (orchestrator as any).mapGrid;
        expect(mapGrid).to.be.instanceOf(MapGrid);
    });

    it('should create a Robot on the second non-empty line', () => {
        orchestrator.ProcessLine('5 3'); // map
        orchestrator.ProcessLine('1 1 E'); // robot initial
        const currentRobot = (orchestrator as any).currentRobot;
        expect(currentRobot).to.be.instanceOf(Robot);
    });

    it('should process commands and reset currentRobot to null after commands', () => {
        orchestrator.ProcessLine('5 3'); // map
        orchestrator.ProcessLine('1 1 E'); // robot initial
        // At this point currentRobot should exist
        expect((orchestrator as any).currentRobot).to.be.instanceOf(Robot);

        orchestrator.ProcessLine('RFRFRFRF'); // commands
        // After processing commands the orchestrator should reset currentRobot to null
        expect((orchestrator as any).currentRobot).to.be.null;
        // Map should still be present
        expect((orchestrator as any).mapGrid).to.be.instanceOf(MapGrid);
    });

    it('should skip empty or whitespace-only lines', () => {
        orchestrator.ProcessLine('   '); // whitespace only should be ignored
        // No mapGrid created
        expect((orchestrator as any).mapGrid).to.be.null;

        orchestrator.ProcessLine('5 3');
        expect((orchestrator as any).mapGrid).to.be.instanceOf(MapGrid);

        // another blank line should not disturb existing state
        orchestrator.ProcessLine('\n');
        expect((orchestrator as any).mapGrid).to.be.instanceOf(MapGrid);
    });

    it('Reset should clear internal state for reuse', () => {
        orchestrator.ProcessLine('5 3');
        orchestrator.ProcessLine('1 1 E');
        expect((orchestrator as any).mapGrid).to.be.instanceOf(MapGrid);
        expect((orchestrator as any).currentRobot).to.be.instanceOf(Robot);

        orchestrator.Reset();
        expect((orchestrator as any).mapGrid).to.be.null;
        expect((orchestrator as any).currentRobot).to.be.null;
        expect((orchestrator as any).scentHash).to.deep.equal({});
    });

    it('should throw an error for lines exceeding maximum length', () => {
        const longLine = 'A'.repeat(101); // 101 characters
        expect(() => orchestrator.ProcessLine(longLine)).to.throw('Line exceeds maximum length of 100 characters.');
    });
});