var express = require('express');
const Image = require('../models/images');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
        console.log(cb);

    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

const uploads = multer({storage});

router.post('/upload', uploads.single('image'), async(req, res) => {
    if(req.file.path!==undefined) {
    const img = req.file.path;
    console.log(img)
    const image = new Image({
        path: img,
        active: req.body.active,
        nameSystem: req.body.nameSystem,
        type: req.body.type,
    });
    try {
        const savedImage = await image.save();
        return res.send(savedImage + " image registered");
        
    } catch(err) {
        return res.status(401).send(err);
    }
    res.json({message: 'image uploaded'});
}
})

router.get('/', (req, res) => {
    const uploads = path.join('uploads');
    console.log(uploads)
    fs.readdir(uploads, (err, files)=> {
        console.log(files)
        if(err) {
            return res.json({message: err})
        }
        if(files.length === 0) {
            return res.json({message: "no files uploaded"});
        }
        return res.json({files})
    })
})

router.get('/presentation', async(req, res) => {
    const uploads = path.join('uploads');
    fs.readdir(uploads, async(err, files)=> {
        if(err) {
            return res.json({message: err})
        }
        if(files.length === 0) {
            return res.json({message: "no files uploaded"});
        }
        const images = await Image.find({ active : true, type: "presentation"}).select('path -_id');

        //filtrera så jag bara får pathname
        //return [filnamn, filnamn]
        fileList = []
        fileList[0] = images[0].path;
        console.log(fileList)


        return res.json({images})
    })
})

router.get('/:systemName', async(req, res) => {
    const uploads = path.join('uploads');
    fs.readdir(uploads, async(err, files)=> {
        if(err) {
            return res.json({message: err})
        }
        if(files.length === 0) {
            return res.json({message: "no files uploaded"});
        }
        const images = await Image.find({ active : true, type: "presentation"}).exec();
        console.log(images)


        return res.json({images})
    })
})


router.post('/delete/:imagename', async (req, res) => {
    if (!req.params.imagename) {
        console.log("No file received");
        return res.status(500).json('error in delete');
    
    } else {
        try {
            fs.unlinkSync('uploads'+'/'+req.params.imagename+'.png');
            return res.status(200).send('Successfully! Image has been Deleted');
          } catch (err) {
            return res.status(400).send(err);
          }
        
    }
})


module.exports = router;