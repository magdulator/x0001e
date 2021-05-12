var express = require('express');
const router = express.Router();
const Systems = require('../models/systems');

//post should check if system already exists
router.patch('/update/:systemName', async(req, res) => {
    const systemName = {systemName: req.params.systemName};

    const updateInfo = req.body;
    
    try {
        const systemExists = await Systems.findOneAndUpdate(systemName, updateInfo);
        if(!systemExists) return res.status(400).send("No system added with name " + req.params.systemName);
        res.send(systemExists);
    } catch(err) {
        res.status(400).send(err);
    }
});

router.post('/create', async(req, res) => {

    //check if system already exists in db
    const systemExists = await Systems.findOne({ systemName : req.body.systemName});
    if(systemExists) return res.status(400).send("system already exists");

    const system = new Systems({
        systemName: req.body.systemName,
        description: req.body.description,
        img: req.body.img,
        exampleData: req.body.exampleData
    });
    try {
        const savedSystem = await system.save();
        res.send(savedSystem.systemName + " registered");
    } catch(err) {
        res.status(400).send(err);
    }
});

router.get('/:systemName', async(req,res) => {
    try {
        const systemExists = await Systems.findOne({ systemName : req.params.systemName});
        res.send(systemExists);

    } catch(err) {
        res.status(400).send(err);
    }

});

router.get('/', async(req,res) => {
    try {
        const systems = await Systems.find({}, {systemName: 1, _id:0});
        res.send(systems)
    } catch(err) {
        res.status(400).send(err);
    }
});

module.exports = router;