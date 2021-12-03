const db = require("../utils/sequelize");
const Transaction = db.define('transaction', {
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
        payment_id: {
            type: Sequelize.INTEGER(11),
            allowNull: true
        },
        status : {
            type: Sequelize.INTEGER(4),
            allowNull:true,
            defaultValue:0
        },

        from_id : {
            type : Sequelize.INTEGER(11),
            allowNull: true
        },

        to_id: {
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
        createdAt: {
            type: Sequelize.DATE(3),
            allowNull: true
        },
        updatedAt: {
            type: Sequelize.DATE(3),
            allowNull: true
        }
    }, {

    })
module.exports=Transaction;
