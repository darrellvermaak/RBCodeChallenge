import { MapGrid } from '../map-grid/map-grid';
import { Robot } from '../robot/robot';
import type { ScentHash } from '../scent-hash/scent-hash.type';

export class RobotOrchestrator {
  private mapGrid: MapGrid | null = null;
  private scentHash: ScentHash;
  private currentRobot: Robot | null = null;

  constructor() {
    this.scentHash = {};
  }

  public ProcessLine(line: string): void {
    if (!line.trim()) return; // Skip empty lines
    if (line.trim().length > 100) throw new Error('Line exceeds maximum length of 100 characters.');
    try {
      if (!this.mapGrid) {
        this.mapGrid = new MapGrid(line);
        return;
      }

      if (!this.currentRobot) {
        this.currentRobot = new Robot(line, this.mapGrid, this.scentHash);
        return;
      }

      this.currentRobot.ProcessCommands(line.trim());
      this.currentRobot = null; // Reset for the next robot
    } catch (error) {
      console.error(`Error processing line "${line}":`, (error as Error).message);
      throw new Error(`Processing failed for line: ${line}`);
    }
  }

  /**
   * Clears the orchestrator state for reuse.
   */
  public Reset(): void {
    this.mapGrid = null;
    this.scentHash = {};
    this.currentRobot = null;
  }
}
