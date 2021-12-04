const Order = require('../models/order');
const User = require ('../models/user');
const uuidv5 = require('uuid/v4');
const {generate_payment_link} = require ('./razorpay')
const {ORDER_APPROVED,ORDER_CREDITED, ORDER_PROCESSING} = require('../constants')
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
        const response = [{
            "id": 1,
            "order_id": 1,
            "status": "Processing",
            "service": "Hello",
            "buyer": {
                "email": "madhvi.mittal@gmail.com",
                "first_name": "Madhvi",
                "last_name": "Mittal",
                "unique_code": "3FeRdb"
            },
            "seller": {
                "email": "tony.kakkar@gmail.com",
                "first_name": "Tony",
                "last_name": "Kakkar",
                "unique_code": "fsIeTQ"
            },
            "grand_total": 100,
            "payment_status": "On hold"
        }, {
            "id": 2,
            "order_id": 2,
            "status": "Completed",
            "service": "development",
            "buyer": {
                "email": "madhvi.mittal@gmail.com",
                "first_name": "Madhvi",
                "last_name": "Mittal",
                "unique_code": "3FeRdb"
            },
            "seller": {
                "email": "neha.kakkar@gmail.com",
                "first_name": "Neha",
                "last_name": "Kakkar",
                "unique_code": "PwI2TQ"
            },
            "grand_total": 80,
            "payment_status": "On hold"
        
        }];
        return response
    } catch (error) {
        throw new Error(error.message);
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
        throw new Error(error.message);
    }
}

const createOrder = async (options) => {
    try {
        const seller = await User.findOne({ where: { uuid: options.code }});
        if(!seller) throw new Error("Seller doesn't exists");

        // if(options.user_id == seller.id) throw new Error("Invalid seller");

        const payLoadForOrder = {
            sender_id :  options.user_id,
            receiver_id :  seller.id,
            status  : ORDER_PROCESSING,
            service : options.service,
            grand_total : parseFloat(parseFloat(options.grand_total).toFixed(2))
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

const completeOrder = async (options) => {
    try {
        //call razorpay api to  make payout and create corresponsing transaction

        const payLoadForOrder = {
            status  : ORDER_CREDITED,
        }
        const order =  await Order.update(payLoadForOrder, {where : {"id":options.id}})
        return  {  message : "Order Successfully completed!" } 
    }   
    catch(error){
        throw new Error(error);
    }
}

module.exports = {
    getAllOrders, 
    updateOrderStatus,
    createOrder,
    completeOrder
}