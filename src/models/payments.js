const db = require("../utils/db");
const Sequelize = require('sequelize');
const Payments = db.define('transaction', {
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        order_id: {
            type: Sequelize.INTEGER(11),
            allowNull: true
        },

        sender_id : {
            type : Sequelize.INTEGER(11),
            allowNull: true
        },

        receiver_id: {
            type : Sequelize.INTEGER(11),
            allowNull: true
        },
        
        charge_id : { 
            type: Sequelize.STRING,
            allowNull:true
        },
        amount : {
            type : Sequelize.DECIMAL(7,2),
            allowNull:true
        }, 
        created_at: {
            type: Sequelize.DATE(3),
            allowNull: true
        },
        updated_at: {
            type: Sequelize.DATE(3),
            allowNull: true
        }
    }, {
        timestamps: false,
        tableName : 'payments'
    })
module.exports=Payments;
