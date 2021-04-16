
exports.wide = (req, res) => {
    var mqtt = require('mqtt')
    var Topic = '#'; //all topics
    var client  = mqtt.connect('mqtt://130.240.74.55', {clientId:"mqttjs01", retain:true, qos:0})
    var options = {retain: true, qos:0}
    client.on('connect', mqtt_connect);
    client.on('reconnect', mqtt_reconnect);
    client.on('error', mqtt_error);
    client.on('message', mqtt_messageReceived);
    client.on('close', mqtt_close);
    var message="test message";
    var topic="test";

    function mqtt_connect(){
        console.log("Connecting MQTT");
        client.subscribe("#", mqtt_subscribe);
        console.log("connected flag  " + client.connected);

    }
    
    function mqtt_subscribe(err, granted)  {
        console.log("Subscribed to " + Topic);
        console.log(granted)
        if (err) {console.log(err);}
    }

    function mqtt_reconnect(err) {
        console.log("Reconnect MQTT");
        if (err) {console.log(err);}
	    client  = mqtt.connect('mqtt://130.240.74.55');
    }

    function mqtt_error(err) {
        console.log("Error!");
	    if (err) {console.log(err);}
    }

    function mqtt_messageReceived(topic, message, packet) {
        //jsonMess = JSON.parse(message)
	    console.log('  message: ' + message);
    }

    function mqtt_close() {
	    console.log("Close MQTT");
    }
}