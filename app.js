const express = require('express')
const app = express()
const sequelize = require("./src/utils/db");
const cors = require('cors');
app.use(cors());
app.listen(3000);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/',function(req,res){
    res.status(200).send("SpringRangers");
})

app.use(require('./src/routes/api'));
app.use(require('./src/routes/user'));
app.use(require('./src/routes/payment'));
app.use(require('./src/routes/order'));

sequelize
  .authenticate()
  .then(() => console.log("Connected"))
  .catch((err) => console.log("Error -> "  + err));
