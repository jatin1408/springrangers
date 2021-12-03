const db = require("../utils/db");
const Sequelize = require('sequelize');
const Users = db.define('users', {
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_name : {
            type: Sequelize.STRING,
            allowNull: false
        },
        email : {
            type: Sequelize.STRING,
            allowNull: false
        },
        password_hash : {
            type: Sequelize.STRING
        },
        status : {
            type: Sequelize.INTEGER(4),
            allowNull:true,
            defaultValue:1
        },

        type : {
            type: Sequelize.INTEGER(4),
            allowNull:true,
            defaultValue:0
        },
        
        mobile_number : {
            type: Sequelize.STRING,
            allowNull:true
        },
        uuid : {
            type: Sequelize.STRING,
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
    } , {

    })
module.exports=Users;
