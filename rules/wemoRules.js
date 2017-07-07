let interfaces = require('./interfaces');
let Matcher = interfaces.Matcher;
let Rule = interfaces.Rule;
let self;

class WemoRule extends Rule{
    constructor(eventName, matcher, callback) {
        super();
        this.eventName = eventName;
        this.matcher = matcher;
        this.callback = callback;
        self = this;
    }
    register(wemoClient) {
        if(self.matcher.matches(wemoClient.device)){
            wemoClient.on(self.eventName, (val) => self.callback(val, wemoClient));
        }
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
    NameMatches
};