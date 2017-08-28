const Bulb = require('tplink-lightbulb');
const interfaces = require('./interfaces');
const Matcher = interfaces.Matcher;
const Rule = interfaces.Rule;
const events = require('events');
const eventEmitter = events.EventEmitter;

class MatchStateTpLinkRule extends Rule {
    constructor(destinationBulbName) {
        super();
        this.destinationBulbName = destinationBulbName;
    }
    register(device){
        let self = this;
        device.on('stateChange', (lightState, bulb) => {
            if (!self.target) {
                self.target = 
                    device.TpLinkStream.bulbs
                    .find( (bulb) => bulb.bulb.name === this.destinationBulbName);
            
            }
            if (self.target) {
                self.target.bulb.set(lightState.on_off);
            }
        });
    }
}   

// Extends a TpLinkBulb to emit events
class TpLinkClient extends eventEmitter {
    constructor(bulb) {
        super();
        this.bulb = bulb;
        this.bulb.info().then( (info) => {
            this.state = info.light_state;
        });
        this.watch();
    }
    watch() {
        setInterval(()=>{
            this.bulb.info().then( (info) => {
                if (JSON.stringify(this.state) !== JSON.stringify(info.light_state)) {
                    this.emit('stateChange', info.light_state, this.bulb);
                    this.state = info.light_state;
                }
            });
        }, 500);
    }
}

class TpLinkStream extends eventEmitter {
    constructor() {
        super();
        this.bulbs = [];
    }
    connect() {
        Bulb.scan().on('light', (light) => {
            let client = new TpLinkClient(light);
            // also attach the stream
            client.TpLinkStream = this;
            this.bulbs.push(client);
            this.emit('deviceDiscovered', client);
        });
    }
}

module.exports = {
    TpLinkClient,
    MatchStateTpLinkRule,
    TpLinkStream
}