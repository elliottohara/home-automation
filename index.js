"use strict;"

//for now, this file just demonstrates the use of the NestAwayStream
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
  let nameMatches = wemoRules.NameMatches;

  let rule1Callback = (val, breakfastLight) => {
      let device = wemo.clients.find((c) => c.device.friendlyName === "Breakfast");
      if(device){
        device.setBinaryState(val);
      }
  };
  
  
  let rule1 = new wemoRule('binaryState', 
    new nameMatches("Kitchen Overhead Lights"), rule1Callback);
  
  let rule = new wemoRules.MatchStateWemoRule('Breakfast', wemo);
  wemo.on('deviceDiscovered', (client) => {
    if( client.device.friendlyName === 'Kitchen Overhead Lights') {
      rule.register(client);
    }
    //rule1.register(client);
  });

  wemo.connect();
  
  
}