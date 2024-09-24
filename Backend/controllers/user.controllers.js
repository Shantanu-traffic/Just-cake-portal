const masterDb = require('../config/db');

async function createUserIfNotExists(profile) {
    const { id, displayName } = profile;
    const email = profile.emails[0].value
    const profile_image = profile.photos[0].value
    console.log("profile",profile)

    const checkUserQuery = 'SELECT * FROM users WHERE google_id = $1';
    const result = await masterDb.query(checkUserQuery, [id]);

    if (result.rows.length > 0) {
       
        return result.rows[0]; // Return existing user
    } else {
        const insertUserQuery = await masterDb.query(`
                            INSERT INTO users (google_id, display_name,profile_picture, email, is_admin)
                            VALUES ($1, $2, $3,$4, $5)
                            RETURNING *;     
            `,[id,displayName,profile_image,email,false])
        return insertUserQuery.rows[0]; 
    }
}

module.exports = { createUserIfNotExists };
