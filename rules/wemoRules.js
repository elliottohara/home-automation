const interfaces = require('./interfaces');
const Matcher = interfaces.Matcher;
const Rule = interfaces.Rule;

class WemoRule extends Rule {
    constructor(eventName, callback) {
        super();
        this.eventName = eventName;
        this.callback = callback;
    }
    register(wemoClient) {
        self = this;
        this.client = wemoClient;
        wemoClient.on(self.eventName, (val) => self.callback(val, wemoClient));
    }
}

class MatchStateWemoRule extends WemoRule {
    constructor(destinationSwitchName, wemoStream) {
        super('binaryState', (val, sourceSwitch) => {
            let device = wemoStream.clients.find((c) => c.device.friendlyName === destinationSwitchName);
            if(device){
                device.setBinaryState(val);
            }
        });
    }
}

/* Matchers */
class NameMatches extends Matcher {
    constructor(name) {
        super();
        this.name = name;
    }
    matches(deviceInfo) {
        return this.name === deviceInfo.friendlyName;
    }
}

module.exports = {
    WemoRule,
    MatchStateWemoRule,
    NameMatches
};