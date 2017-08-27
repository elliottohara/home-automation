"use strict;"
let config = require('./configs/config');
//NestStuff();
WemoStuff();

function NestStuff(){
  let nestAwayStream = require("./streams/nestAwayStream");
  let nest = new nestAwayStream(config.nest);
  let nestRules = require('./rules/nestRules');
  let nestRule = nestRules.NestRule;
  let when = new nestRules.When(nest);
  let trueMatch = nestRules.TrueMatch;
  let rule1 = new nestRule('away', new trueMatch(), () => console.log('away'));
  rule1.register(nest);
  let rule2 = new nestRule('home', new trueMatch(), () => console.log('home'));
  rule2.register(nest);
  
  nest.connect();
  
}

function WemoStuff(){
  let wemoStream = require('./streams/wemoStream');
  let wemo = new wemoStream();
  let wemoRules = require('./rules/wemoRules');
  let wemoRule = wemoRules.WemoRule;
  let rule = new wemoRules.MatchStateWemoRule('Breakfast', wemo);
  
  wemo.on('deviceDiscovered', (client) => {
    if( client.device.friendlyName === 'Kitchen Overhead Lights') {
      rule.register(client);
    }
   });

  wemo.connect();
  
}