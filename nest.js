"use strict";
let config = require('./config');
let nest = require('unofficial-nest-api')
let events = require('events').EventEmitter;
let eventEmitter = new events();
let away = undefined;

nest.login(config.nest.Email, config.nest.Password, (err, data) => {
     nest.fetchStatus( (data) => {
        let away = data.structure[Object.keys(data.structure)[0]].away
        emitEvents(away);
        subscribe();
     });
});
function subscribe(){
    // only care about structure
    nest.subscribe(subscribeDone, ['structure']);
}
function subscribeDone(deviceId, data, type) {
    
    if (deviceId) {
        emitEvents(data.away);
    }
    
    setTimeout(subscribe, 2000);
}
function emitEvents(away){
    if(away){
            eventEmitter.emit('awayOn');
        }else{
            eventEmitter.emit('awayOff');
        }
}
module.exports = {
    events: eventEmitter
}