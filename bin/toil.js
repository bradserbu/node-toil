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

    const program = fs.readJsonSync(filepath);

    return Program.load(program);
}

// Parse the command line arguments
const argv = yargs
    .usage('$0 <cmd> [args] [options]')
    .command('run [activity]', 'Run a program activity.', {
        program: {
            alias: 'p',
            default: './program.json',
            describe: 'Path to the "program.json" file.'
        }
    }, argv => {
        const program = argv.program;
        const activity = argv.activity;

        const args = argv._;

        logger('PROGRAM', argv.program);
        logger('ACTIVITY', argv.activity);
        logger('ARGS', argv.args);

        // Load the program then run a command and exit
        loadProgram(program)
            .then(program => {
                logger('RUN', activity);
                return program.run(activity, args);
            });
    })
    .help()
    .argv;