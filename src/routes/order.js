const express = require('express');
const router = express.Router();
const { orderManager } = require('../managers');

router.get('/get-orders',async (req,res) => {
    try {
        const result = await orderManager.getAllOrders();
        res.status(200).send(result)
    }
    catch(error){
        res.send({ error: error, message : "Not able to fetch orders :( " } )
    }
})

module.exports = router;