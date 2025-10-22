import type { MapGrid } from "../map-grid/map-grid";
import type { ScentHash } from "../scent-hash/scent-hash.type";

export class Robot {
    private currentCoords!: { x: number; y: number };
    private currentOrientation!: string;
    private isLost: boolean = false;

    private orientationChars = ['N', 'E', 'S', 'W'];
    private commands = ['L', 'R', 'F']; // this could be an enum but keeping simple for now - both methods are extendable for future commands

    constructor(line: string, private mapGrid: MapGrid, private scentHash: ScentHash) {
        this.initialiseState(line);
    }

    public ProcessCommands(commands: string) {
        for (let command of commands) {
            if (!this.commands.includes(command)) {
                console.error(`Invalid command character: ${command}`);
                throw new Error(`Invalid command character ${command}.`);;
            }
            switch (command) {
                case 'L':
                    this.turnLeft();
                    break;
                case 'R':
                    this.turnRight();
                    break;
                case 'F':
                    this.moveForward();
                    break;
            }
        }
        if (!this.isLost) {
            console.log(`Final Position: (${this.currentCoords.x}, ${this.currentCoords.y}) facing ${this.currentOrientation}`);
        }
    }

    private initialiseState(line: string) {
        let robotArray = this.validateLine(line);
        this.validateAndSetInitialState(robotArray);
        console.log(`Robot initialized at (${this.currentCoords.x}, ${this.currentCoords.y}) facing ${this.currentOrientation}`);
    }

    private validateLine(line: string): string[] {
        let robotArray = line.trim().split(/\s+/); // Split by any amount of whitespaces - as per specification
        if (robotArray.length !== 3) {
            throw new Error('Invalid Robot Instruction File - robot initialisation must contain two space separated integers and a character representing the robots co-ordinates and orientation.');
        }
        return robotArray;
    }

    private validateAndSetInitialState(robotArray: string[]):void {
        let x = parseInt(robotArray[0]!, 10);
        let y = parseInt(robotArray[1]!, 10);
        if (!this.validateCoords(x, y)) {
            throw new Error('Initial coordinates are out of bounds of the map grid.');
        }
        this.setCurrentCoords(x, y);
        this.validateAndSetCurrentOrientation(robotArray[2]!);
    }

    private validateAndSetCurrentOrientation(orientation: string) {
        if (!this.validateOrientation(orientation)) {
            throw new Error('Invalid initial orientation character.');
        }
        this.setCurrentOrientation(orientation);
    }

    private setCurrentCoords(x: number, y: number) {
        this.currentCoords = { x, y };
    }

    private setCurrentOrientation(orientation: string) {
        this.currentOrientation = orientation;
    }

    private validateCoords(x: number, y: number): boolean {
        if (x < 0 || x > this.mapGrid.x || y < 0 || y > this.mapGrid.y) {
            return false;
        }
        return true;
    }

    private validateOrientation(orientation: string): boolean {
        return this.orientationChars.includes(orientation);
    }

    private turnLeft() {
        let currentIndex = this.orientationChars.indexOf(this.currentOrientation);
        let newIndex = (currentIndex - 1 + this.orientationChars.length) % this.orientationChars.length;
        this.setCurrentOrientation(this.orientationChars[newIndex]!);
    }

    private turnRight() {
        let currentIndex = this.orientationChars.indexOf(this.currentOrientation);
        let newIndex = (currentIndex + 1) % this.orientationChars.length;
        this.setCurrentOrientation(this.orientationChars[newIndex]!);
    }

    private moveForward() {
        // Check scent hash to see if we should ignore the move
        if (this.isCoordsInScentHash(this.currentCoords.x, this.currentCoords.y, this.currentOrientation)) {
            console.log(`Ignored move that would cause loss at (${this.currentCoords.x}, ${this.currentCoords.y}) facing ${this.currentOrientation} due to scent.`);
            return;
        }
        const newwCoords = { ...this.currentCoords };
        switch (this.currentOrientation) {
            case 'N':
                newwCoords.y += 1;
                break;
            case 'E':
                newwCoords.x += 1;
                break;
            case 'S':
                newwCoords.y -= 1;
                break;
            case 'W':
                newwCoords.x -= 1;
                break;
            default:
                return;
        }

        if (this.validateCoords(newwCoords.x, newwCoords.y)) {
            this.setCurrentCoords(newwCoords.x, newwCoords.y);
        } else {
            // Robot is lost
            this.isLost = true;
            console.log(`Robot lost at (${this.currentCoords.x}, ${this.currentCoords.y}) facing ${this.currentOrientation}`);
            // Add to scent hash
            const key = `${this.currentCoords.x}:${this.currentCoords.y}`;
            if (!this.scentHash[key]) {
                this.scentHash[key] = '';
            }
            this.scentHash[key] += this.currentOrientation;
        }
    }

    private isCoordsInScentHash(x: number, y: number, orientation: string): boolean {
        const key = `${x}:${y}`;
        if (this.scentHash.hasOwnProperty(key)) {
            let orientations = this.scentHash[key];
            return orientations!.includes(orientation);
        }
        return false;
    }
}