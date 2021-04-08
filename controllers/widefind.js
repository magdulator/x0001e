var mqtt = require('mqtt');


exports.wide = () => {
    console.log("hrj")
    var client = mqtt.connect("mqtt://130.240.114.24/", {host: '130.240.114.24', port: 1883, clientId:55});

    client.on('message',function(topic, message, packet){
        console.log("message is "+ message);
        console.log("topic is "+ topic);
    });

    client.on("connect",function(){	
        console.log("connected");
    });

    client.on("error",function(error){
        console.log("Can't connect" + error);
        process.exit(1)});

   
}