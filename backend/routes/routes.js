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




 module.exports = router;