const widefind = require('../controllers/widefind');
var express = require('express');

//WIDEFIND ROUTES


module.exports = function(io) {
    let router = express.Router()
   
    router.get('/widefind', (req, res, next) => {
        console.log("route ok")
        let interval;
        io.on("connection", (socket) => {
        console.log("New client connected");
        res.send('tja')
        
        interval = setInterval(() => getApiAndEmit(socket), 1000);
        socket.on("disconnect", () => {
            console.log("Client disconnected");
            clearInterval(interval);
        });
        });
    });

    const getApiAndEmit = socket => {
        const response = new Date();
        // Emitting a new message. Will be consumed by the client
        socket.emit("FromAPI", response);
      };

    return router;
}

