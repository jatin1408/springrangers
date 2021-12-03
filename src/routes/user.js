const express = require('express');
const router = express.Router();

router.get('/api/user/register',function(req,res) {
    res.status(200).send("Hello!")
})

router.get('/api/user/login',function(req,res) {
    res.status(200).send("Hello!")
})

module.exports = router;