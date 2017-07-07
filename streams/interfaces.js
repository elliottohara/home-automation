let EventEmitter = require('events').EventEmitter;

class Stream extends EventEmitter {
    connect(){
        throw new Error("Not implemented");
    }
}

module.exports = {
    Stream,
}