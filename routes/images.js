var express = require('express');

const router = express.Router();
const path = require('path');
const fs = require('fs');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

const uploads = multer ({storage});

router.post('/upload', uploads.single('image'), async (req, res) => {
    const image = req.file.path;
    res.json({message: 'image uploaded'});
})

router.get('/', (req, res) => {
    const uploadsDir = path.join('uploads');
    fs.readdir(uploadsDir, (err, files)=> {
        if(err) {
            return res.json({message: err})
        }
        if(files.length === 0) {
            return res.json({message: "no files uploaded"});
        }
        return res.json({files})
    })
})


module.exports = router;