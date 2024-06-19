const model = require('../models/propertiesModel');
const validProperties = {
    sectors: true,
    genders: true,
    areas: true,
    ages: true,
    family_income_levels: true,
    education_levels: true
};

async function getProperty(property) {
    try {
        if (!validProperties[property]) {
            throw new Error(`Invalid property: ${property}`);
        }
        const userRes = await model.getProperty(property);
        return userRes;
    } catch (err) {
        throw err;
    }
}
module.exports = {
    getProperty
};
