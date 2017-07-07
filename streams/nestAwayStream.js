"use strict";
let interfaces = require("./interfaces");
let Stream = interfaces.Stream;

let nest = require('unofficial-nest-api')
let self;

class NestAwayEventEmitter extends Stream {
    constructor(config){
        super();
        this.email = config.Email;
        this.password = config.Password;   
        this.subscribed = false; 
        self = this;
    }

    connect(){
        nest.login(this.email, this.password, (err, data) => {
            if(!err){
                self.emit('loggedIn', data);
            }else{
                self.emit('error', err);
                return;
            }
            nest.fetchStatus( (data) => {
                let away = data.structure[Object.keys(data.structure)[0]].away
                self._emitEvents(away);
                self._subscribe();
            });
        });
    }
    
    _emitEvents(away, data){
        if(away){
                self.emit('away', data);
            }else{
                self.emit('home', data);
            }
    }

    _subscribe(){
        // only care about structure
        nest.subscribe(
            (deviceId, data, type) => self._subscribeDone(deviceId, data, type), ['structure']);
    }

    _subscribeDone(deviceId, data, type) {
        if(!self.subscribed){
            self.emit('subscribed', data);
            self.subscribed = true;
        }

        if (deviceId) {
            self._emitEvents(data.away, data);
        }
        
        setTimeout(self._subscribe, 2000);
    }
}


module.exports = NestAwayEventEmitter;