
const fibaro = require('../controllers/fibaro');
var express = require('express');
const {auth, isAdmin} = require('../middlewares/authJWT')
const router = express.Router();

//FIBARO ROUTES: http://localhost:5000/api/fibaro/getAll
router.get('/fibaro/getAll', auth, (fibaro.getAll));
//router.get('/fibaro/getAllA', isAdmin, (fibaro.getAll))
router.get('/fibaro/:id', (fibaro.getNode));

router.get('/fibaro/nodes/:roomID', (fibaro.getRoomNodes));

router.get('/admin',auth, isAdmin, (req, res) => {
    res.send('admin page');
})

//WIDEFIND ROUTES

 module.exports = router;