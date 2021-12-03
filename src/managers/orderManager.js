const Order = require('../models/order');
const { query } = require('../utils/db');

const getAllOrders =  async (options) => {
    try {
        const query = {
            where : {
                id : 1
            }
        }
        
        const result = await Order.findAll(query);

        return result
    } catch (error) {
        throw new Error(error);
    }
}
module.exports = {
    getAllOrders
}