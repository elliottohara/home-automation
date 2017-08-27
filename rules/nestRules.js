let interfaces = require('./interfaces');
let Rule = interfaces.Rule;
let Matcher = interfaces.Matcher;

class NestRule extends Rule {
    constructor(eventName, matcher, callback){
        super();
        this.eventName = eventName;
        this.matcher = matcher;
        this.callback = callback;

    }
    register(device){
        if(this.matcher.matches(device)){
            device.on(this.eventName, this.callback);
        }
    }
}

class TrueMatch extends Matcher {
    matches(device){
        return true;
    }
}

module.exports = {
    NestRule,
    TrueMatch,
    When

}