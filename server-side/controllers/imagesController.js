const model = require('../models/imagesModel');

async function updateImage(image,question_id) {
    try {
        return model.updateImage(image,question_id);
    } catch (err) {
        throw err;
    }
}


module.exports = {updateImage}