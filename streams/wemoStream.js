let interfaces = require("./interfaces");
let Stream = interfaces.Stream;

let WemoClient = require('wemo-client');
let wemo = new WemoClient();
let self;

class WemoStream extends Stream {
    constructor(){
        super();
        self = this;
        self.clients = [];
    }
    connect(){
       wemo.discover((err, deviceInfo) => {
            //console.log(JSON.stringify(deviceInfo));
            console.log(`Found ${deviceInfo.friendlyName} (${deviceInfo.modelName})`);
            let client = wemo.client(deviceInfo);
            self.clients.push(client);
            self.emit('deviceDiscovered', client);
        });
    }
}

module.exports = WemoStream;


  