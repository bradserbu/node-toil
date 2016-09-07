'use strict';

// ** Dependencies
const _ = require('underscore');
const Promise = require('bluebird');
const EventEmitter = require('events').EventEmitter;
const Container = require('./Container');

class Program extends EventEmitter {
    constructor(name) {
        super();

        this.name = name;
        this.activities = new Container();
    }

    run(activity, args, options) {

        const activity = this.activities.get(activity);
    }

    shutdown() {
        throw Error('NOT_IMPLEMENTED');
    }
}

function loadActivity(definition) {

}

function loadProgram(definition) {

    const name = definition.name;

    const program = new Program(name);

    // Load Activities
    if (definition.activities) {
        _.mapObject(definition.activities, (activity, name) => {
            program.activities.add(name, activity);
        });
    }

    return Promise.resolve(program);
}

// ** Exports
module.exports.Program = Program;
module.exports.load = loadProgram;