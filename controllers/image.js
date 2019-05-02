'use strict'

const UserCtrl = require('../controllers/user')
var multer = require('multer');
var cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: 'dg7ybkbb8',
    api_key: '422514376465374',
    api_secret: 'oZuF8qjPFWB5nDBEYloHUkvMJFY'
});

const ImageCtrl = {}

let url = ""
const pwd = process.cwd();

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        console.log(pwd)
        callback(null, pwd);
    },
    filename: function(req, file, callback) {
        url = pwd+"/"+file.fieldname + "_" + Date.now() + "_" + file.originalname
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage
}).array("imgUploader", 3); //Field name and max count

ImageCtrl.uploadimage = async (req, res) => {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        uploadimagecloud(url)
        return res.end("File uploaded sucessfully!.");
    });
};

async function uploadimagecloud(url){
    console.log("URL",url)
    cloudinary.v2.uploader.upload(url, function(error, result) {
        console.log(result, error)
        let id = "5caf128799d1b20ba9d761e2"
        UserCtrl.updateImage(result.url,id)
    });

}

module.exports = ImageCtrl