const userManager = require('./userManager');
const orderManager = require('./orderManager');
const razorpayManager = require('./razorpay');

module.exports = {
    userManager: userManager,
    orderManager: orderManager,
    razorpayManager: razorpayManager
}