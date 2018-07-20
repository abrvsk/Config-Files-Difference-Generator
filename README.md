# project-lvl2-s293

[![Maintainability](https://api.codeclimate.com/v1/badges/66b9ad06ada7d8e98d3f/maintainability)](https://codeclimate.com/github/abrvsk/project-lvl2-s293/maintainability)

[![Build Status](https://travis-ci.com/abrvsk/project-lvl2-s293.svg?branch=master)](https://travis-ci.com/abrvsk/project-lvl2-s293)

Simple cli-tool for checking difference between configuration files. At this point works with flat JSON, YML and INI files.

To instal use
    npm install lvl2-s293

For help use gendiff ---help

To format output use
    -f plain
    -f standard
    -f json

For example
    gendiff -f plain <path-to-first-config> <path-to-second-config>
