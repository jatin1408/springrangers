const Order = require('../models/order');
const User = require ('../models/user')

const getAllOrders =  async (options) => {
    try {
        const query = {
            where : {
                sender_id : options.user_id
            }, 
            include : [ {
                model : User,
                attributes : ["id","first_name","last_name" , "email", "status" , "type" ,"mobile_number" ,"uuid"]
            }],
            attributes: ['id', 'sender_id' , 'receiver_id' , 'status' , 'service' , 'payment_id', 'grand_total', 'created_at'], 
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
        //Call RazarPay Api for payout where transfer from razorpay to xyz
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