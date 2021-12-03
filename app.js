const express = require('express')
const app = express()
const { Sequelize } = require('sequelize');
const router = require('./src/routes');
const cors = require('cors');
app.use(cors());
app.listen(3000);

app.get('/',function(req,res){
    res.status(200).send("SpringRangers");
})

app.use('/api', router.api);
const sequelize = new Sequelize('safepay', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});


async function testConnection()
{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

testConnection()