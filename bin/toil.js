'use strict';

const DEFAULT_FILEPATH = './program.json';

// ** Dependecies
const yargs = require('yargs');
const util = require('util');
const fs = require('fs-extra');
const path = require('path');
const Program = require('../lib/Program');
const debug = require('debug');
const logger = debug('toil');

/**
 * Load the programs json file
 */
function loadProgram(filepath) {

    filepath = filepath || DEFAULT_FILEPATH;

    if (!fs.existsSync(filepath))
        throw Error('The "program.json" file could not be found.');

    if (fs.lstatSync(filepath).isDirectory()) {
        logger('IS_DIRECTORY', filepath);
        filepath = path.join(filepath, 'program.json');
    }

    const json = fs.readJsonSync(filepath);
    return json;
}

// Parse the command line arguments
const argv = yargs
    .usage('$0 <cmd> [args] [options]')
    .command('run [program]', 'Run a program.', {}, args => {
        console.log(loadProgram(args.program));
    })
    .help()
    .argv;