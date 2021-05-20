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
        return res.send(req.params.systemName + " updated");
    } catch(err) {
        return res.status(400).send(err);
    }
});

router.post('/create', async(req, res) => {

    //check if system already exists in db
    const systemExists = await Systems.findOne({ systemName : req.body.systemName});
    if(systemExists) return res.status(400).send({message: "URL name already exists"});

    const titleExists = await Systems.findOne({ title : req.body.title});
    if(titleExists) return res.status(400).json({message: "Title already exists"});

    const system = new Systems({
        title: req.body.title,
        systemName: req.body.systemName,
        description: req.body.description,
        img: req.body.img,
        exampleData: req.body.exampleData
    });
    try {
        const savedSystem = await system.save();
        return res.send(savedSystem.systemName + " registered");
    } catch(err) {
        return res.status(401).send(err);
    }
});

router.get('/:systemName', async(req,res) => {
    try {
        const systemExists = await Systems.findOne({ systemName : req.params.systemName});
        return res.send(systemExists);

    } catch(err) {
        return res.status(400).send(err);
    }

});

router.get('/', async(req,res) => {
    try {
        const systems = await Systems.find({}, {title: 1, systemName:1, _id:0});
        return res.send(systems);
    } catch(err) {
        return res.status(400).send(err);
    }
});


module.exports = router;