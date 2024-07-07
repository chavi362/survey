const express = require("express");
const config = require('../config/config')
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { updateImage } = require('../controllers/imagesController');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { getQuestionById } = require("../controllers/questionsController");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors({ origin: config.CORS_ORIGIN, credentials: true }));
router.use(cookieParser());

// Ensure the directory exists
const uploadDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.put('/:gift_id', upload.single('image'), async (req, res) => {
    try {
        const image = req.file.filename;
        if (!req.file.filename) {
            const error = {
                message: "Fill in the data"
            }
            res.status(400).send(error);
        }
        else {
            const question_id = req.params.question_id;

            if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
                return res.status(400).send({ msg: 'Only image files (jpg, jpeg, png) are allowed!' });
            }

            await updateImage(image, question_id);
            console.log("Image updated successfully.");

            const questionAfterUpdate = await getQuestionById(question_id);
            res.send(questionAfterUpdate);
        }

    } catch (err) {
        console.error("Error updating image:", err);
        res.status(500).send({ error: err.message });
    }
});

module.exports = router;