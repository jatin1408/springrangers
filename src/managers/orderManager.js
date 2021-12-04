const Order = require('../models/order');
const User = require ('../models/user');
const uuidv5 = require('uuid/v4');
const {generate_payment_link} = require ('./razorpay')
const {ORDER_APPROVED,ORDER_REJECTED, ORDER_PROCESSING} = require('../constants')
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

const createOrder = async (options) => {
    try {
        const seller = await User.findOne({ where: { uuid: options.code }});
        if(!seller) throw new Error("Seller doesn't exists");

        if(options.user_id == seller.id) throw new Error("Invalid seller");

        const payLoadForOrder = {
            sender_id :  options.user_id,
            receiver_id :  seller.id,
            status  : ORDER_PROCESSING,
            service : options.service,
            grand_total : options.grand_total
        }

        const payLoadForRazorPay = {
            referenece_id : uuidv5(),
            amount : options.grand_total 
        }
        const razorPayPaymentLink = await generate_payment_link(payLoadForRazorPay) 
        const order =  await Order.create(payLoadForOrder)
        return  { order : order, razorPayPaymentLink : razorPayPaymentLink,  message : "Order Created!" } 
    }   
    catch(error){
        throw new Error(error);
    }
}

module.exports = {
    getAllOrders, 
    updateOrderStatus,
    createOrder
}