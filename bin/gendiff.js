#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import gendiff from '../index.js';

const program = new Command();
program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<file1>')
  .argument('<file2>')
  .action((file1, file2) => {
    console.log(gendiff(file1, file2, program.opts().format));
  });
program.parse();
