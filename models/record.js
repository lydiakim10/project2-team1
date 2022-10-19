const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Record extends Model {}

Record.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
        }
    },

    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isFloat: true,
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
        }
    },
    merchant: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE
    },
    updated_at: {
        type: DataTypes.DATE
    }

}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'record',
});

module.exports = Record;