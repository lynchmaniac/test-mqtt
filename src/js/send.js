let mqtt = require('mqtt');
let os = require('os');


const SEND_CHANNEL = 'lea';


//on se connecte au broker (localhost) et on suscribe aux command message
let clientMqtt = mqtt.connect('ws://localhost:3001', {
  clientId: 'mqtt_test2_' + os.hostname()
});

clientMqtt.on("connect", connection);

// Connexion au broker
function connection() {

    console.log('debug', "client connecté");

}
let cpt = 0;
let frestTweet = [];

sendMessage();




function sendMessage() {
  var message="test message_";

  var timer_id=setInterval(function(){
    frestTweet.push(message+increaseCpt())
  },1000);


  var topic=SEND_CHANNEL;
  //publish every 5 secs
  var options = {QoS: 2, retain: true}
  var timer_id=setInterval(function(){
    publish(topic,frestTweet.pop(),options);
  },2000);

}
//publish function
function publish(topic,msg,options){
  console.log("publishing",msg);
  if (clientMqtt.connected == true){
    clientMqtt.publish(topic,msg,options);
  }
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function increaseCpt() {
  return cpt++;
}
