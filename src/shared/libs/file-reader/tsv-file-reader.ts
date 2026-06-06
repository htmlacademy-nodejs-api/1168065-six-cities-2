import { createReadStream } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import EventEmitter from 'node:events';

const CHUNK_SIZE = 16384; // 16KB

export class TSVFileReader extends EventEmitter implements FileReader {
  constructor(private readonly filename: string) {
    super();
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      nextLinePosition = remainingData.indexOf('\n');

      while (nextLinePosition >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition).trim();

        remainingData = remainingData.slice(nextLinePosition + 1);

        const isImported = await new Promise<boolean>((resolve) => {
          this.emit('line', completeRow, resolve);
        });

        if (isImported) {
          importedRowCount++;
        }

        nextLinePosition = remainingData.indexOf('\n');
      }
    }

    this.emit('end', importedRowCount);
  }
}
