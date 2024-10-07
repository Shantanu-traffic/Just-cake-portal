const bcrypt = require('bcrypt')

const hashPassowrd = async (password)=>{
    try {
        const saltRounds = 10;
        const hash_password = await bcrypt.hash(password,saltRounds)
        return hash_password
    } catch (error) {
        throw error
    }
}


const comparePassword = async (password,hashPassword)=>{
    try {
        const compare_pass = await bcrypt.compare(password,hashPassword)
        return compare_pass
    } catch (error) {
       throw error
    }
}


module.exports = {hashPassowrd,comparePassword}