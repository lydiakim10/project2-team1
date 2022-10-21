const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    // Check that the entered password matches password in the database
    checkPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

User.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
        resetString: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        }
    },

    // Encrypt user's password before adding to database
    {
        hooks: {
            beforeCreate: async(newUserData) => {

                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeSave: async(updatedUserData) => {

                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },

        },
        sequelize,
        paranoid: true,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;