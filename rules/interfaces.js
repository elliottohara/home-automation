class Matcher { 
    matches(device){
        throw new Error("Not implemented");
    }
}

class Rule {
    register(device){
        throw new Error("Not implemented");
    }
}

module.exports = {
    Matcher,
    Rule
};