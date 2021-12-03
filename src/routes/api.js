const express = require('express');
const router = express.Router();

router.get('/test',function(req,res) {
    res.status(200).send("Hello!")
})

module.exports = router;