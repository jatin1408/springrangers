const db = require("../utils/sequelize");
const Order = db.define('order',{
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        sender_id: {
            type: Sequelize.INTEGER(11),
            allowNull: true
        },
        receiver_id: {
            type: Sequelize.INTEGER(11),
            allowNull: true
        },
        status : {
            type: Sequelize.INTEGER(4),
            allowNull:true,
            defaultValue:0
        },

        service : {
            type : Sequelize.STRING,
            allowNull: true
        },

        createdAt: {
            type: Sequelize.DATE(3),
            allowNull: true
        },
        updatedAt: {
            type: Sequelize.DATE(3),
            allowNull: true
        },
        payment_id : { 
            type: Sequelize.INTEGER(11),
            allowNull:true
        },
        grand_total : {
            type : Sequelize.DECIMAL,
            allowNull:true
        } 
    },
    {

});

module.exports=Order;
