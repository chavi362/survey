const pool = require('../DB.js');


async function getSignup(body) {
    try {
        body = JSON.parse(body);
        const body_username = JSON.stringify(body.username);
        const body_password = body.password;
        console.log("model username: " + body_username);
        console.log("model password: " + body_password);


        const sql = `SELECT * FROM users WHERE users.username = ${body_username}`;
        const result = await pool.query(sql);
        console.log(result[0][0]);


        if (result[0][0]) {
            console.log("username is ok");
            return;
        } else {
            console.log("User already exist");
            throw new Error("User already exist");
        }
    } catch (err) {
        throw err;
    }
}




async function postSignup(body) {
    body = JSON.parse(body);

    try {
        const { password, fullname, username, email, address, company, phone, website } = body;

        console.log("body password:" + password);

        const addressId = await findOrCreateAddress(address);
        const companyId = await findOrCreateCompany(company);

        const userInsertQuery = `INSERT INTO users (fullname, username, email, address_id, company_id, phone, website)
            VALUES ('${fullname}', '${username}', '${email}', ${addressId}, ${companyId}, '${phone}', '${website}')`;
        await pool.query(userInsertQuery);

        const getUserQuery = `SELECT * FROM users WHERE username = "${username}"`;
        userResult = await pool.query(getUserQuery);
        const currentUser = userResult[0][0];

        const currentUserId = currentUser.user_id;
        const passwordInsertQuery = `INSERT INTO passwords (user_id, user_password)
        VALUES ('${currentUserId}', '${password}')`;
        await pool.query(passwordInsertQuery);

        console.log("User created successfully");
        return { success: true, message: "User created successfully", user: currentUser };

    } catch (error) {
        // console.error("Error:", error);
        return { success: false, message: "An error occurred" };
    }
}

// async function findOrCreateAddress(address) {
//     const addressCheckQuery = `SELECT address_id FROM addresses 
//         WHERE street = '${address.street}' AND suit = '${address.suit}' 
//         AND city = '${address.city}' AND zipcode = '${address.zipcode}'`;
//     const addressCheckResult = await pool.query(addressCheckQuery);
//     if (addressCheckResult[0].length > 0) {
//         // Address already exists
//         return addressCheckResult[0][0].address_id;
//     } else {
//         // Address doesn't exist, create new
//         const geoId = await createGeo(address.geo);
//         const addressInsertQuery = `
//             INSERT INTO addresses (street, suit, city, zipcode, geo_id) 
//             VALUES ('${address.street}', '${address.suit}', '${address.city}', '${address.zipcode}', ${geoId})
//         `;
//         await pool.query(addressInsertQuery);
//         return getLastInsertId();
//     }
// }

// async function createGeo(geo) {
//     const geoInsertQuery = `
//         INSERT INTO geos (lat, lng) 
//         VALUES (${geo.lat}, ${geo.lng})
//     `;
//     await pool.query(geoInsertQuery);
//     return getLastInsertId();
// }

// async function findOrCreateCompany(company) {
//     const companyCheckQuery = `
//         SELECT company_id FROM companies WHERE company_name = '${company.name}'
//     `;
//     const companyCheckResult = await pool.query(companyCheckQuery);
//     if (companyCheckResult[0].length > 0) {
//         // Company already exists
//         return companyCheckResult[0][0].company_id;
//     } else {
//         // Company doesn't exist, create new
//         const companyInsertQuery = `
//             INSERT INTO companies (company_name, catchPhrase, bs) 
//             VALUES ('${company.name}', '${company.catchPhrase}', '${company.bs}')
//         `;
//         await pool.query(companyInsertQuery);
//         return getLastInsertId();
//     }
// }

async function getLastInsertId() {
    const getLastInsertIdQuery = `SELECT LAST_INSERT_ID() AS last_id`;
    const lastInsertIdResult = await pool.query(getLastInsertIdQuery);
    return lastInsertIdResult[0][0].last_id;
}



module.exports = { postSignup, getSignup }  