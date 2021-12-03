const express = require('express');
const router = express.Router();
const { userManager } = require('../managers');

router.post('/api/user/register',async (req, res) => {
    try {
        const result = await userManager.register(req.body);
        res.status(200).send({ message: "Success" });
    } catch(error){
        res.status(500).send({ message: error.message })
    }
})

router.get('/api/user/login',async (req, res) => {
    try {
        console.log(req.body)
        const result = await userManager.login(req.body);
        res.status(200).send({ message: "Success" });
    } catch(error){
        res.status(500).send({ message: error.message })
    }
})

module.exports = router;