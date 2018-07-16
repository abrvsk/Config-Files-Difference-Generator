#!/usr/bin/env node

// import program from 'commander';
import genDiff from '..';

const program = require('commander');

genDiff('It works!');

program
  .version('0.0.1')
  .option('-h, --help', 'output usage information')
  .option('-V, --version', 'output version number')
  .option('-f, --format [type]', 'output format')
  .on('-h, --help', () => {
    console.log('Usage: gendiff [options] <firstConfig> <secondConfig>');
    console.log('');
    console.log('Compares two configuration files and shows a difference.');
    console.log('');
    console.log('  Options:');
    console.log('');
    console.log('    -h, --help             output usage information');
    console.log('    -V, --version          output version number');
    console.log('    -f, --format [type]    output format');
    console.log('');
  });

program.parse(process.argv);
