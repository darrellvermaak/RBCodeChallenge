import { MapGridCoordinates } from "./map-grid.type";

export class MapGrid {

    private coordinates!: MapGridCoordinates

    constructor(line: string) {
        let gridArray = this.createArrayFromLine(line);
        this.validateAndSetCoordinates(gridArray);
        console.log(`Map grid created with dimensions (${this.coordinates.x}, ${this.coordinates.y})`);
    }

    private createArrayFromLine(line: string): string[] {
        return line.trim().split(/\s+/); // Split by any amount of whitespaces - as per specification
    }

    private validateAndSetCoordinates(gridArray: string[]) {
        if (gridArray.length !== 2) {
            throw new Error('Invalid Robot Instruction File - first line must contain two space separated integers representing grid dimensions.');
        }
        this.coordinates = {x: parseInt(gridArray[0]!, 10) , y: parseInt(gridArray[1]!, 10)};
        if (this.coordinates.x < 0 || this.coordinates.x > 50 || this.coordinates.y < 0 || this.coordinates.y > 50) {
            throw new Error('Map grid dimensions must be between 0 and 50.');
        }
    }

    public get x(): number {
        return this.coordinates.x;
    }

    public get y(): number {
        return this.coordinates.y;
    }

}