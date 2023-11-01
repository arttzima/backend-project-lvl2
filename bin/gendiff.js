#!/usr/bin/env node

import { program } from 'commander';
import grab from '../index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    grab(filepath1, filepath2);
  });

program.parse();
