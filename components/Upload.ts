import multer from 'multer';
import uuid from 'uuid';
import fs from 'fs';
import path from 'path';
import logger from './logger'

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let upload= path.join(__dirname,'..', 'public', 'uploads')
        // console.log(agencyImagePath);
        
      cb(null,upload)
    },
    filename: function (req, file, cb) {
      cb(null,`${uuid.v4()}.${file.originalname.split('.').pop()}`);
    }
})

function fileFilter (req:any, file:any, cb:any){
    var type = file.mimetype;
    var typeArray = type.split("/");
    if (typeArray[0] == "image") {
        cb(null, true);
    }else {
        cb(null, false);
        // cb(new Error('only videos are allowed'))
    }
}

export default  multer({ storage ,fileFilter})