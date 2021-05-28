exports.wide = (socket) => {
    var mqtt = require('mqtt')
    var Topic = '#'; //all topics
    var client  = mqtt.connect('mqtt://130.240.74.55', {clientId:"mqttjs01", retain:true, qos:0})
    var options = {retain: true, qos:0}
    client.on('connect', mqtt_connect);
    client.on('reconnect', mqtt_reconnect);
    client.on('error', mqtt_error);
    client.on('message', mqtt_messageReceived);
    client.on('close', mqtt_close);

    function mqtt_connect(){
        client.subscribe("#", mqtt_subscribe);

    }
    
    function mqtt_subscribe(err, granted)  {

        if (err) {console.log(err);}
    }

    function mqtt_reconnect(err) {
        
	    client  = mqtt.connect('mqtt://130.240.74.55');
    }

    function mqtt_error(err) {
        client.end()
        client  = mqtt.connect('mqtt://130.240.74.55');

    }

    function mqtt_messageReceived(topic, message, packet) {
        var buffer = Buffer.from((message));
        var jsonMess = ""
        jsonMess = buffer.toString();
        if(jsonMess[0] === '{'){    //check for right format on message
            jsonMess = JSON.parse(jsonMess)
            if(jsonMess.message.includes('REPORT')) {
                socket.emit('new-message', jsonMess.message);
            }

        }
    }

    function mqtt_close() {
      client.end()
  }
}