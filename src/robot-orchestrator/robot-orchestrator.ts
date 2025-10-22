import { MapGrid } from '../map-grid/map-grid';
import { Robot } from '../robot/robot';
import type { ScentHash } from '../scent-hash/scent-hash.type';

export class RobotOrchestrator {
  private mapGrid: MapGrid | null = null;
  private scentHash: ScentHash;
  private currentRobot: Robot | null = null;
  private results: string[] = [];

  constructor() {
    this.scentHash = {};
  }

  public ProcessLine(line: string): void {
    if (!line.trim()) return; // Skip empty lines

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
      this.results.push(`Error on line "${line}": ${(error as Error).message}`);
    }
  }

  /**
   * Clears the orchestrator state for reuse.
   */
  public Reset(): void {
    this.mapGrid = null;
    this.scentHash = {};
    this.currentRobot = null;
    this.results = [];
  }
}
