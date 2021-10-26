const router = require("express").Router();
const multer = require("multer");
const Aws = require("aws-sdk");

const Notes = require("../models/notes-model.js");


// s3 instance
const s3 = new Aws.S3();

// to store the image
const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null,'');
    }
});

// to make sure the image is correct filetype
const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        callback(null, true);
    } else {
        callback(null, false);
    }
}

// defines the multer object that will be used in my post request to upload the image to aws
const upload = multer({ storage, fileFilter });

// s3 variable to utilize aws upload to bucket
// const s3Instance = new Aws.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
// });

router.get("/presignedUrl", (req, res) => {
    res.send({message: "Here are your notes"});
});

// router.post("/", upload.single('testimage'), (req, res) => {
//     console.log(req.file);

//     // s3 needs certain params to upload the file, those will be defined here
//     const params = {
//         bucket: process.env.AWS_BUCKET_NAME
//     }
// });

router.post("/presignedUrl", (req, res) => {
    Aws.config.update({
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
    });

    const s3Params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: "fileNameTest",
        Expires: 60 * 60,
        ContentType: "image/*"
    };

    s3.getSignedUrl("putObject",s3Params, (err, data) => {
        if (err) {
            res.status(500).send({ message: "There was a problem retrieving the signed URL.", "error": err })
        } else {
            res.send(data);
        }
    });
});

module.exports = router;