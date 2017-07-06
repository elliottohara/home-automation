"use strict;"

//for now, this file just demonstrates the use of the NestAwayStream
let config = require('./configs/config');
let nestAwayStream = require("./streams/nestAwayStream");
let nest = new nestAwayStream(config.nest);

nest.connect();
nest.on('loggedIn', () => console.log('Logged In'));
nest.on('subscribed', () => console.log('Subscribed'));
nest.on('away', () => console.log(`Away`));
nest.on('home', () => console.log(`Home`));
