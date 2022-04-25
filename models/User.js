const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create user model
class User extends Model {}

//define table columns and config
User.init(
    {
        // TABLE COLUMN DEFINITIONS HERE

        //define id col
        id: {
            //use special sqlize datatypes obj to provide data type
            type: DataTypes.INTEGER,
            // sqlize 'NOT NULL' option
            allowNull: false,
            //make primary key
            primaryKey: true,
            //turn on autoincrement
            autoIncrement: true
        },
        //define username col
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //define email col
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //make sure no duplicates in table
            unique: true,
            // run validation since allowNull is 'false'
            validate: {
                isEmail:true
            }
        },
        //define password col
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //password MUST be at least 4 characters long
                len: [4]
            }
        }
    },
    {
        // TABLE CONFIG OPTIONS HERE

        //pass in sequelize connection
        sequelize,
        //DON'T automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        //DON'T pluralize name of database table
        freezeTableName: true,
        //use underscores instead of CamelCasing
        underscored: true,
        //make sure model stays lowercase in database
        modelName: 'user'
    }
);

module.exports = User;