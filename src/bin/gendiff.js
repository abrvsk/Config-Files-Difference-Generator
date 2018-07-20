#!/usr/bin/env node

import commander from 'commander';
import genDiff from '..';
import { version } from '../../package.json';

commander
  .version(version, '-V, --version')
  .description('Compares two configuration files and shows the difference. Works with .json, .yml and .ini files.')
  .option('-f, --format [type]', 'Output format. Use plain, standard or json')
  .arguments('<firstConfig> <secondConfig>')
  .action(((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, commander.format));
  }));

commander.parse(process.argv);
