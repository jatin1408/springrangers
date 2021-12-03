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
        res.send({ error: error, message : "Not able to fetch orders :( " } )
    }
})

module.exports = router;