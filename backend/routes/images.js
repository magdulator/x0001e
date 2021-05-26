var express = require('express');

const router = express.Router();
const path = require('path');
const fs = require('fs');
const Image = require('../models/images');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')

    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

const uploads = multer({storage});

router.post('/upload', uploads.single('image'), async(req, res) => {
    try {
        if(req.file.path) {
            const img = req.file.path;
            const clean = path.basename(img)
            const image = new Image({
                path: clean,
                active: req.body.active,
                nameSystem: req.body.nameSystem,
                type: req.body.pictype,
            });
            try {
                const savedImage = await image.save();
                return res.status(200).json({message: savedImage.path + " image registered"});
                
            } catch(err) {
                return res.status(400).json({message: "Kan inte ladda upp"});
            }
        }
    } catch(err) {
        return res.status(401).json({message: "Ingen fil vald"});
    }
})

router.get('/all', async(req, res) => {
    try {
        const images = await Image.find({}).select({path:1, type:1, active: 1});
        if(!images) return res.status(400).json({message: "Inga bilder uppladdade"});
        return res.status(200).json({images})         
    } catch(err) {
        return res.status(400).json({message: err});
    }   
})


router.get('/presentation/active', async(req, res) => {
    try {
        const images = await Image.find({ active : true, type: "presentation"}).select('path -_id');
        if(!images) return res.status(400).json({message: "Inga bilder uppladdade"});
        const files = [];
        images.forEach(file =>
            files.push(file.path)
        )
        return res.status(200).json({files})            
    } catch(err) {
        return res.status(400).json({message: err});
    }   
})

router.get('/screensaver/active', async(req, res) => {
    try {
        const images = await Image.find({ active : true, type: "screensaver"}).select('path -_id');
        if(!images) return res.status(400).json({message: "Inga bilder uppladdade"});
        const files = [];
        images.forEach(file =>
            files.push(file.path)
        )
        return res.status(200).json({files})            
    } catch(err) {
        return res.status(400).json({message: err});
    }   
})

router.get('/system/:nameSystem', async(req, res) => {
    try {
        const image = await Image.findOne({type: "systemdata", nameSystem : req.params.nameSystem});
        if(!image) return res.status(400).json({message: "Bilden finns inte"});

        return res.status(200).json({image});
                   
    } catch(err) {
        return res.status(400).json({message: err});
    }   
})

router.patch('/update/:path', async(req, res) => {
    const imagePath = {path: req.params.path};
    const updateInfo = req.body;
    try {
        const image = await Image.findOneAndUpdate(imagePath, updateInfo);
        if(!image) return res.status(400).send("Finns ingen bild med namn: " + req.params.path);
        return res.status(200).json({message: "Bild " + req.params.path + " updaterad"});
    } catch(err) {
        return res.status(400).send("Kunde inte uppdatera");
    }
});

router.post('/delete/:imagename', async (req, res) => {
    if (!req.params.imagename) {
        return res.status(400).json({message: 'Bild ej funnen'});
    
    } else {
        try {
            fs.unlinkSync('uploads'+'/'+req.params.imagename);
            const del = await Image.deleteOne({path: req.params.imagename})
            if(!del) return res.status(400).json({message: "Ingen bild med namn: " + req.params.imagename});
            return res.status(200).json({message: 'Bild är raderad'});
          } catch (err) {
            return res.status(400).json({message: err});
          }    
    }
})

module.exports = router;