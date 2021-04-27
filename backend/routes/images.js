var express = require('express');

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

router.post('/upload', uploads.single('image'), async (req, res) => {
    const image = req.file.path;
    res.json({message: 'image uploaded'});
})

router.get('/', (req, res) => {
    const uploads = path.join('uploads');
    fs.readdir(uploads, (err, files)=> {
        if(err) {
            return res.json({message: err})
        }
        if(files.length === 0) {
            return res.json({message: "no files uploaded"});
        }
        return res.json({files})
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