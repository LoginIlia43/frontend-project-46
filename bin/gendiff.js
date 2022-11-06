#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import getFileData from '../src/getFileData.js';
import compareFilesData from '../src/compareFilesData.js';

const program = new Command();
program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .argument('<file1>')
  .argument('<file2>')
  .action((file1, file2) => {
    const data1 = getFileData(file1);
    const data2 = getFileData(file2);
    console.log(compareFilesData(data1, data2))
  });
program.parse();
