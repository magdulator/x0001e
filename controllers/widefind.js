
exports.wide = () => {
    var mqtt = require('mqtt')
    var client  = mqtt.connect('mqtt://130.240.74.55')
 
    client.on('connect', function () {
        console.log("connect")
        client.subscribe('presence', function (err) {
        if (!err) {
            client.publish('presence', 'Hello mqtt')
        }
        })
    })
 
    client.on('message', function (topic, message) {
    // message is Buffer
        console.log(message.toString())
        client.end()
    })

}