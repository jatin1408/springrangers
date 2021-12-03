const db = require("../utils/db");
const Sequelize = require('sequelize');
const UserPaymentService = db.define('user_payment_methods',{
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER(11),
            allowNull: true
        },
        status : {
            type: Sequelize.INTEGER(4),
            allowNull:true,
            defaultValue:0
        },
        createdAt: {
            type: Sequelize.DATE(3),
            allowNull: true
        },
        updatedAt: {
            type: Sequelize.DATE(3),
            allowNull: true
        }
    },{
    })
module.exports=UserPaymentService;