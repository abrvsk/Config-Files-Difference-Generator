#!/usr/bin/env node

import genDiff from '..';

const commander = require('commander');

commander
  .version('0.0.1', '-V, --version')
  .description('Compares two configuration files and shows the difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action(((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, commander.format));
  }));

commander.parse(process.argv);
