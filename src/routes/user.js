const express = require('express');
const router = express.Router();
const {userManager} = require('../managers');

router.post('/api/user/register',function(req,res) {
    console.log("req ", req.body)
    userManager.register(req.body).then(result => {
        res.status(200).send(result);
    }).catch(error => {
        console.log(error);
    })
})

router.get('/api/user/login',function(req,res) {
    res.status(200).send("Hello!")
})

module.exports = router;