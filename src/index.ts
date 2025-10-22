import { createReadStream } from "node:fs";
import { RobotOrchestrator } from "./robot-orchestrator/robot-orchestrator";
import { createInterface } from "node:readline";
import { join } from "node:path";

async function processInstructionsFile(filePath: string): Promise<string[]> {
  const orchestrator = new RobotOrchestrator();
  const fileStream = createReadStream(filePath);

  return new Promise((resolve, reject) => {
    fileStream.on('error', (error) => {
      console.error('Error opening file:', error.message);
      fileStream.destroy();
      reject(error);
    });

    const rl = createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
      orchestrator.ProcessLine(line);
    });

    rl.on('close', () => {
      fileStream.destroy();
    });
  });
}

// Run the application
async function main() {
  const filePath = join(__dirname, 'instructions', 'instructions.txt');
  try {
    const results = await processInstructionsFile(filePath);
  } catch (error) {
    console.error('Failed to process instructions:', (error as Error).message);
    process.exit(1);
  }
}

main();