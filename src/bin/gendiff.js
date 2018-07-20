#!/usr/bin/env node

import commander from 'commander';
import genDiff from '..';

commander
  .version('0.1.1', '-V, --version')
  .description('Compares two configuration files and shows the difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action(((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, commander.format));
  }));

commander.parse(process.argv);
