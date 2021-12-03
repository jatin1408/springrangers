const Order = require('../models/order');

const getAllOrders =  async (options) => {
    try {
        console.log ("Orders123" , Order)
        // query = {
        //     where : {
        //         user_id : 1
        //     }
        // }
        
        const result = await Order.findAll();

        return result
    } catch (error) {
        throw new Error(error);
    }
}
module.exports = {
    getAllOrders
}