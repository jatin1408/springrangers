const express = require('express');
const router = express.Router();
const { razorpayManager } = require('../managers');

router.post('/validate',async (req,res) => {
    try {
        const result = await razorpayManager.validatePayment(req, res);
        res.status(200).send(result)
    }
    catch(error){
        res.status(500).send(error )
    }
})

module.exports = router;