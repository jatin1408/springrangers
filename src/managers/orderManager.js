const Orders = require('../models/order');
const { query } = require('../utils/db');
const getAllOrders =  async (options) => {
    try {
        query = {
            where : {
                user_id : 1
            }
        }
        [error, result] = await Orders.findOne(query)

        return result
    } catch (error) {
        throw new Error(error);
    }
}
module.exports = {
    getAllOrders
}