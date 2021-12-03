const { options } = require('../models/order');
const Order = require('../models/order');
const Payments = require('../models/payments');
const Transaction = require('../models/transaction');
const User = require ('../models/user')

const getAllOrders =  async (options) => {
    try {
        const query = {
            where : {
                sender_id : options.user_id
            }, 
            include : [User,Payments,Transaction]
        }
        
        const result = await Order.findAll(query);
        return result
    } catch (error) {
        console.log ("Error", error)
        return error
        
    }
}

const updateOrderStatus  =  async (options) => {
    try {
        const query = {
            where : {
                id : options.order_id,
                sender_id: options.user_id
            }
        }
        const updated = {
            status  : options.status
        }
        //Call RazarPay Api
        const result = await Order.update(updated, query)
        return  { message : "Order updated!" }
    }
    catch (error){
        return error
    }
}
module.exports = {
    getAllOrders, 
    updateOrderStatus
}