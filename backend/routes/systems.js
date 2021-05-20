var express = require('express');
const router = express.Router();
const Systems = require('../models/systems');

//post should check if system already exists
router.patch('/update/:systemName', async(req, res) => {
    const systemName = {systemName: req.params.systemName};
    const updateInfo = req.body;
    try {
        const systemExists = await Systems.findOneAndUpdate(systemName, updateInfo);
        if(!systemExists) return res.status(400).json({message:"Inget system med namnet: " + req.params.systemName});
        return res.status(200).json({message: req.params.systemName + " updaterad"});
    } catch(err) {
        return res.status(400).json({message: "Kan inte uppdatera"});
    }
});

router.post('/create', async(req, res) => {

    //check if system already exists in db
    const systemExists = await Systems.findOne({ systemName : req.body.systemName});
    if(systemExists) return res.status(400).json({message: "URL namnet finns redan"});

    const titleExists = await Systems.findOne({ title : req.body.title});
    if(titleExists) return res.status(400).json({message: "Titelnamnet finns redan"});

    const system = new Systems({
        title: req.body.title,
        systemName: req.body.systemName,
        description: req.body.description,
        img: req.body.img,
        exampleData: req.body.exampleData
    });
    try {
        const savedSystem = await system.save();
        return res.status(200).json({message: savedSystem.systemName + " registrerad"});
    } catch(err) {
        return res.status(401).json({message: "Kan inte spara"});
    }
});

router.get('/:systemName', async(req,res) => {
    try {
        const systemExists = await Systems.findOne({ systemName : req.params.systemName});
        if(!systemExists) return res.status(400).json({message: "Systemet finns inte"});

        return res.status(200).send(systemExists);

    } catch(err) {
        return res.status(400).json({message: err});
    }

});

router.get('/', async(req,res) => {
    try {
        const systems = await Systems.find({}, {title: 1, systemName:1, _id:0});
        return res.status(200).send(systems);
    } catch(err) {
        return res.status(400).json({message: err});
    }
});


module.exports = router;