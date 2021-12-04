const express = require('express')
const app = express()
const sequelize = require("./src/utils/db");
const cors = require('cors');
const Order = require('./src/models/order')
const Transaction = require('./src/models/transaction')
const User = require('./src/models/user')
const Payments = require('./src/models/payments')
const UserPaymentMethods = require('./src/models/userPaymentMethods')
require('dotenv').config({path:__dirname+'/../.env'});
app.use(cors());
app.listen(3000);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/',function(req,res){
    res.status(200).send("SpringRangers");
})

app.use(require('./src/routes/api'));
app.use(require('./src/routes/user'));
// app.use(require('./src/routes/payment'));
app.use(require('./src/routes/order'));
app.use(require('./src/routes/razorpay'));

sequelize
  .authenticate()
  .then(() => console.log("Connected"))
  .catch((err) => console.log("Error -> "  + err));

Order.belongsTo(User,{foreignKey : "sender_id" , targetKey : "id" , as : "Seller" })
Order.belongsTo(User,{foreignKey : "receiver_id" , targetKey : "id", as : "Receiver" })
Order.belongsTo(Payments, {foreignKey : "payment_id" , targetKey : "id"})
Order.hasMany(Transaction, {foreignKey : "order_id" , sourceKey : "id"})
User.hasMany(UserPaymentMethods,  {foreignKey : "user_id" , targetKey : "id"})
Transaction.belongsTo(Order, {foreignKey : "order_id" , targetKey: "id"})
Transaction.belongsTo(Payments, {foreignKey : "payment_id" , targetKey: "id"})
Transaction.belongsTo(User, {foreignKey : "from_id" , targetKey: "id"})
Transaction.belongsTo(User, {foreignKey : "to_id" , targetKey: "id"})
