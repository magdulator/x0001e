const fibaro = require('../controllers/fibaro');
const widefind = require('../controllers/widefind');
var express = require('express');

const router = express.Router();

//FIBARO ROUTES: http://localhost:5000/api/fibaro/getAll
router.get('/fibaro/getAll', (fibaro.getAll));

router.get('/fibaro/:id', (fibaro.getNode));

router.get('/fibaro/nodes/:roomID', (fibaro.getRoomNodes));


//WIDEFIND ROUTES

router.get('/widefind', (widefind.wide));


var returnRouter = function(io) {
    router.get('/', function(req, res, next) {
        res.render('index', {
            title: 'Express'
        });
    });

    router.post('/message', function(req, res) {
        console.log("Post request hit.");
        // res.contentType('text/xml');
        console.log(appjs);
        io.sockets.emit("display text", req);
        // res.send('<Response><Sms>'+req.body+'</Sms></Response>');
    });

    return router;
}


 module.exports = router;