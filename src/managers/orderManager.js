const Order = require('../models/order');
const User = require ('../models/user');
const uuidv5 = require('uuid/v4');
const {generate_payment_link} = require ('./razorpay')
const Constants = require('../constants')
const getAllOrders =  async (options) => {
    try {
        const query = {
            where : {
                sender_id : options.user_id
            }, 
            include : [ {
                model : User,
                attributes : ["first_name","last_name" , "email", "uuid"],
                as : "Seller"
            },
            {
                model : User,
                attributes : ["first_name","last_name" , "email", "uuid"],
                as : "Receiver"
            }
        ],
            attributes: ['id', 'sender_id' , 'receiver_id' , 'status' , 'service' , 'grand_total', 'created_at'], 
        }
        
        const result = await Order.findAll(query);
        result.forEach((item) => {
            for (const [key, value] of Object.entries(Constants)) {
                if(value == item.status) {
                    item.status=key;
                    break
                }
            }
        })
              // const response = [{
        //     "id": 1,
        //     "order_id": 1,
        //     "status": "Processing",
        //     "seller": {
        //         "email": "madhvi.mittal@gmail.com",
        //         "first_name": "Madhvi",
        //         "last_name": "Mittal",
        //         "unique_code": "3FeRdb"
        //     },
        //     "buyer": {
        //         "email": "tony.kakkar@gmail.com",
        //         "first_name": "Tony",
        //         "last_name": "Kakkar",
        //         "unique_code": "fsIeTQ"
        //     },
        //     "grand_total": 100
        // }, {
        //     "id": 2,
        //     "order_id": 2,
        //     "status": "Completed",
        //     "seller": {
        //         "email": "madhvi.mittal@gmail.com",
        //         "first_name": "Madhvi",
        //         "last_name": "Mittal",
        //         "unique_code": "3FeRdb"
        //     },
        //     "buyer": {
        //         "email": "neha.kakkar@gmail.com",
        //         "first_name": "Neha",
        //         "last_name": "Kakkar",
        //         "unique_code": "PwI2TQ"
        //     },
        //     "grand_total": 80
        
        // }];
        return result
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
            status  : CONSTANTS.ORDER_PROCESSING,
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

function getStatus (status)  {
    for (const [key, value] of Object.entries(Constants)) {
        if(value == status) return key
    }
    return  ""
}

module.exports = {
    getAllOrders, 
    updateOrderStatus,
    createOrder,
    completeOrder
}