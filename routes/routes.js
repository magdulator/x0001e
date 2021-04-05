
const fibaro = require('../controllers/fibaro');
var express = require('express');

const router = express.Router();

//FIBARO ROUTES: http://localhost:5000/api/fibaro/getAll
router.get('/fibaro/getAll', (fibaro.getAll));

//WIDEFIND ROUTES

 module.exports = router;