const masterDb = require("../../config/db.connect")

class OrderService{
    async deliveryAddress(req){
        const {address,user_id,street,city,state,postal_code,country} = req
        try {
            const result = await masterDb.query(`
                    INSERT INTO addresses ()
                `,[address,user_id,street,city,state,postal_code,country])
        } catch (error) {
            return error
        }
    }

    async orderProduct(req){}
    
}

const Order = new OrderService()
module.exports = Order