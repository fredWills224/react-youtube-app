const express = require('express');
const router = express.Router();
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');

const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

let storage = multer.diskStorage({

    destination: function(req, file, cb){
        cb(null, 'uploads/thumbnails');
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter:(req, file, cb) => {
        
        const ext = path.extname(file.originalname)
        if(ext !== '.mp4' || ext !== '.jpg') {
            return cb(res.status(400).end('only mp4 or jpeg files are allowed'), false);
        }
        cb(null, true);

    }


});

let upload = multer({ storage: storage }).single("file");

//=================================
//             Video
//=================================

router.post("/uploadfiles", (req, res) => {

    upload(req, res, err => {
        
        if(err){
            return res.json({success: false, err})
        }
        return res.json({success: true, filePath: res.req.file.path, 
            fileName: res.req.file.fileName})
        ;

    });

});

router.post("/thumbnail", (req, res) =>{

    let thumbsFilePath = "";
    let fileDuration = "";

    ffmpeg.ffprobe(req.body.filePath, function(err, metadata){
        console.dir(metadata);
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
    })

    ffmpeg(req.body.filePath)
        .on('filenames', function (filenames){
            console.log('Will generate ' + filenames.join(', '))
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function (){
            console.log('Screenshots taken');
            return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration })
        })
        .screenshots({
            //Will take screens at 20%, 40%, 60%, and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size: '320x240',
            // %b input basename ( filename w/o extension )
            fileName: 'thumbnail-b%.png'
        })
    ;

});

module.exports = router;
