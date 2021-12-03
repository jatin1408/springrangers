const express = require('express')
const app = express()
const sequelize = require("./utils/db");
const router = require('./routes');
const cors = require('cors');
app.use(cors());
app.listen(3000);

app.get('/',function(req,res){
    res.status(200).send("SpringRangers");
})

sequelize
  .authenticate()
  .then(() => console.log("Connected"))
  .catch((err) => console.log("Error -> "  + err));

app.use('/api', router.api);



