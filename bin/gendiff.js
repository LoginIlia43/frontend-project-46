#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';

const program = new Command();
program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format');
program.parse();
