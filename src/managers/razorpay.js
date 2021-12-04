const crypto = require("crypto");
const axios = require("axios");
const logIt = require("./../logger/logger");
const Enum = require("enum");
const Transactions = require('../models/transaction');
const razorpayConfig = require("./../config/razorpay.config");

const PAYMENT_STATUS = new Enum([
  "PENDING",
  "FAILED",
  "COMPLETED",
  "CANCELLED",
]);


function checkIfValid(secret, data, signature) {
  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(data));
  const digest = shasum.digest("hex");
  if (digest === signature) return true;
  else return false;
}

exports.validatePayment = async (req, res) => {
  // do a validation
  logIt.logIt(
    "INFO",
    "POST /payment/api/v1/razorpay/validate webhook for razrorpay event : " +
      req.body.event
  );
  const secret = razorpayConfig.RAZORPAY_SECRET;

  if (checkIfValid(secret, req.body, req.headers["x-razorpay-signature"])) {
    let paymentData = await Transactions.findOne({where:{
      reference_id: req.body.payload.payment_link.entity.reference_id,
    }});
    if (paymentData) {
      if (req.body.event === "payment_link.paid") {
        logIt.logIt("INFO", "Updating Payment status as Completed");
        paymentData.paymentStatus = PAYMENT_STATUS.COMPLETED.toString();
      } else if (req.body.event === "payment_link.cancelled") {
        logIt.logIt("INFO", "Updating Payment status as Cancelled");
        paymentData.paymentStatus = PAYMENT_STATUS.CANCELLED.toString();
      } else {
        logIt.logIt("INFO", "Updating Payment status as Failed");
        paymentData.paymentStatus = PAYMENT_STATUS.FAILED.toString();
      }
      await paymentData.save();
    }
    res.status(200).json({ status: "ok" });
  } else {
    // pass it
    logIt.logIt("ERROR", "Signature is not valid");
    res.json({ status: "failed" });
  }
};

async function generate_payment_link(orderData){
  const options = {
    amount: orderData.amount * 100,
    currency: "INR",
    accept_partial: false,
    expire_by: parseInt(Date.now() / 1000) + 120 * 60,
    reference_id: orderData.reference_id,
    description: "Payment for Transaction ID " + orderData.order_id,
    customer: {
      name: "PaySafe",
      contact: "9830049539",
      email: "agarwal.mohit4211@gmail.com",
    },
    notify: {
      sms: true,
      email: true,
    },
    reminder_enable: true
  };
let session_url = "https://api.razorpay.com/v1/payment_links";
let uname = razorpayConfig.RAZORPAY_KEY_ID;
let pass = razorpayConfig.RAZORPAY_KEY_SECRET;
console.log ("Unmae" , uname)
console.log ("Pass" , pass)
console.log ("Options" , options)
let responseData = await axios.post(
  session_url, options, {
    auth: {
      username: uname,
      password: pass,
    },
  });
  if(responseData && responseData.data && responseData.data.short_url)
  {
    logIt.logIt(
      "INFO",
      "Payment link generated with data " + JSON.stringify(responseData.data)
    );
    orderData.paymentLink = responseData.data.short_url;
    let paymentData = await Transactions.create(orderData);
    if (paymentData) {
      logIt.logIt(
        "INFO",
        "Creating payment for email: " +
          paymentData.email +
          " with the following parameters: " +
          JSON.stringify(paymentData)
      );
      return responseData.data;
    } else {
      logIt.logIt("ERROR", "Error in saving payment data" + paymentData);
      return null;
    }
  } else{
    logIt.logIt("ERROR", "Error while generating payment link");
    return null;
  }
}

module.exports = {
  generate_payment_link
}