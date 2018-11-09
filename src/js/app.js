let mqtt = require('mqtt');
let os = require('os');


const SEND_CHANNEL = 'lea';


//on se connecte au broker (localhost) et on suscribe aux command message
let clientMqtt = mqtt.connect('ws://localhost:3001', {
  clientId: 'mqtt_test_' + os.hostname()
});

clientMqtt.on("connect", connection);
clientMqtt.on("message", onMessageReceived);

// Connexion au broker
function connection() {

    console.log('debug', "client connecté");
    clientMqtt.subscribe(SEND_CHANNEL);

}

function onMessageReceived(topic, strPayload) {
  setTimeout(function() {
    console.log('debug', "wait.....");
    console.log('debug', "onMessageReceived " + strPayload + " " + process.hrtime());
  }, 5000);

     

}

