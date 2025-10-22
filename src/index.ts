import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { join } from 'path';

import { MapGrid } from './map-grid/map-grid';
import { Robot } from './robot/robot';
import type { ScentHash } from './scent-hash/scent-hash.type';

let mapGrid: MapGrid | undefined;
let scentHash: ScentHash = {}
let robot: Robot | undefined;

const filePath = join(__dirname, 'instructions', 'instructions.txt');

const fileStream = createReadStream(filePath);

fileStream.on('error', (error) => {
  console.error('Error opening file:', error.message);
  process.exit(1);
});

const rl = createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

rl.on('line', (line) => {
  if (!line.trim()) return;
  if (!mapGrid) {
    mapGrid = new MapGrid(line);
    return;
  }
  if (!robot) {
    robot = new Robot(line, mapGrid, scentHash);
    return;
  }
  robot.ProcessCommands(line.trim());
  robot = undefined;
});

rl.on('close', () => {
  fileStream.destroy();
});

fileStream.on('close', () => {
  console.log('');
});
