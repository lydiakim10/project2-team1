const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Budget extends Model {}

Budget.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    month: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    budget: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
        }
    }
}, {
    sequelize,
    paranoid: true,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'budget',
});

module.exports = Budget;