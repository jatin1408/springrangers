const db = require("../utils/db");
const Sequelize = require('sequelize');
const Transaction = db.define('transaction', {
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        reference_id : { 
            type: Sequelize.STRING,
            allowNull:true
        },
        order_id: {
            type: Sequelize.INTEGER(11),
            allowNull: true
        },
        status : {
            type: Sequelize.ENUM,
            values: ["PENDING", "FAILED", "COMPLETED", "CANCELLED"],
            defaultValue: "PENDING",
            allowNull: false
        },

        from_id : {
            type : Sequelize.INTEGER(11),
            allowNull: true
        },

        to_id: {
            type : Sequelize.INTEGER(11),
            allowNull: true
        },
        payment_link : { 
            type: Sequelize.STRING,
            allowNull:true
        },
        amount : {
            type : Sequelize.DECIMAL(7,2),
            allowNull:true
        }, 
        created_at: {
            type: Sequelize.DATE(3),
            allowNull: true,
            defaultValue: Sequelize.fn('NOW')
        },
        updated_at: {
            type: Sequelize.DATE(3),
            allowNull: true,
            defaultValue: Sequelize.fn('NOW')
        }
    }, {
        timestamps: false,
        tableName : 'transaction'
    })
module.exports=Transaction;
