'use strict';

// ** Dependencies
const EventEmitter = require('events').EventEmitter;

class Program extends EventEmitter {
    constructor(name) {
        super();

        this.name = name;
    }

    run(activity) {
        throw Error('NOT_IMPLEMENTED');
    }
}

// ** Exports
module.exports.Program = Program;