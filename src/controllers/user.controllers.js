const masterDb = require('../config/db.connect');
const {UserServices}  = require('../services/index');
require('../services/index')
async function createUserIfNotExists(profile) {
const createUser = UserServices.User.registerUser
    try {
        const result = await createUser(profile)
        return result
    } catch (error) {
        return error
    }
}

module.exports = { createUserIfNotExists };
