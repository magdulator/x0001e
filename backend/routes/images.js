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
                type: req.body.type,
            });
            try {
                const savedImage = await image.save();
                return res.status(200).json({message: savedImage + " image registered"});
                
            } catch(err) {
                return res.status(401).json({message: "Could not upload"});
            }
        }
    } catch(err) {
        return res.status(401).json({message: "No file chosen"});
    }
})

router.get('/', (req, res) => {
    const uploads = path.join('uploads');
    fs.readdir(uploads, (err, files) => {
        if(err) {
            return res.status(400).json({message: err})
        }
        if(files.length === 0) {
            return res.status(400).json({message: "No files uploaded"});
        }
        return res.status(200).json({files})
    })
})



router.get('/presentation/active', async(req, res) => {
    try {
        const images = await Image.find({ active : true, type: "presentation"}).select('path -_id');
        if(!images) return res.status(400).json({message: "No pictures"});
        const files = [];
        images.forEach(file =>
            files.push(file.path)
        )
        return res.json({files})            
    } catch(err) {
        return res.status(400).json({message: err});
    }   
})

router.get('/presentation/all', async(req, res) => {
        try {
            const images = await Image.find({type: "presentation"}).select({path:1, active: 1});
            if(!images) return res.status(400).json({message: "No pictures "});
            return res.json({images})         
        } catch(err) {
            return res.status(400).json({message: err});
        }   
})

router.patch('/update/:path', async(req, res) => {
    const imagePath = {path: req.params.path};
    const updateInfo = req.body;
    try {
        const image = await Image.findOneAndUpdate(imagePath, updateInfo);
        if(!image) return res.status(400).send("No image added with path " + req.params.path);
        return res.status(200).json({message: req.params.path + " updated"});
    } catch(err) {
        return res.status(400).send(err);
    }
});

router.post('/delete/:imagename', async (req, res) => {
    if (!req.params.imagename) {
        return res.status(400).json({message: 'error in delete'});
    
    } else {
        try {
            fs.unlinkSync('uploads'+'/'+req.params.imagename);
            const del = await Image.deleteOne({path: req.params.imagename})
            if(!del) return res.status(400).json({message: "No image added with path " + req.params.imagename});
            return res.status(200).json({message: 'Successfully! Image has been deleted'});
          } catch (err) {
            return res.status(400).json({message: err});
          }
        
    }
})


module.exports = router;