const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Records extends Model {}

Records.init({
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
            model: user,
            key: id,
        }
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: category,
            key: id,
        }
    },
    cost: {
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
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'records',
});

module.exports = Records;