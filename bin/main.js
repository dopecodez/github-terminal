#!/usr/bin/env node

require = require('esm')(module);
require('../src/cli').cli(process.argv);