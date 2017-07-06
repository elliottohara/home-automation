let nest = require("./nest");
let config = require('./config');
nest.events.on('awayOn', () => console.log(`Away on`));
nest.events.on('awayOff', () => console.log(`Away off`));
