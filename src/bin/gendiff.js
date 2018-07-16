#!/usr/bin/env node

import genDiff from '..';
import { version } from '../../package.json';

const commander = require('commander');

commander
  .version(version, '-V, --version')
  .description('Compares two configuration files and shows the difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action(((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig));
  }));

commander.parse(process.argv);
