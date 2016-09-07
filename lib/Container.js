'use strict';

// ** Dependencies
const util = require('util');
const EventEmitter = require('events').EventEmitter;

class Container extends EventEmitter {
    constructor() {
        super();

        this.items = {};
    }

    add(name, item) {

        // add({name:,...}) -> add(name, {...})
        if (arguments.length === 1 && util.isObject(arguments[0]))
            return this.add(arguments[0].name, arguments[0]);

        if (!name)
            throw Error('Container items must have a name');

        if (this.items.hasOwnProperty(name))
            throw Error(`Item name "${name}" already added to the container.`);

        this.items[name] = item;
    }

    remove(name) {
        delete this.items[name];
    }

    get(name) {
        return this.items[name];
    }
}

module.exports = Container;
module.exports.Container = Container;