const express = require('express');
const router = express.Router();
const { orderManager } = require('../managers');

router.get('/get-orders/:id',async (req,res) => {
    try {
        const options  = {
            user_id: req.params.id
        }
        const result = await orderManager.getAllOrders(options);
        res.status(200).send(result)
    }
    catch(error){
        res.status(500).send({ error: error, message : "Not able to fetch orders :( " } )
    }
})

router.put('/update-order',async (req,res) => {
    try {
        const result = await orderManager.updateOrderStatus(req.body);
        res.status(200).send(result)
    }
    catch(error){
        res.status(500).send({ error: error, message : "Not able to updated order :( " } )
    }
})

router.put('/complete-order',async (req,res) => {
    try {
        const result = await orderManager.completeOrder(req.body);
        res.status(200).send(result)
    }
    catch(error){
        res.status(500).send({ error: error, message : "Not able to Complete order :( " } )
    }
})

router.post('/create-order',async (req,res) => {
    try {
        const result = await orderManager.createOrder(req.body);
        res.status(200).send(result)
    }
    catch(error){
        res.status(500).send({ error: error, message : "Not able to create order :( " } )
    }
})


module.exports = router;