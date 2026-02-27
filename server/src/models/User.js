const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('farmer', 'buyer', 'admin'),
        defaultValue: 'buyer'
    },
    location: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true
});

module.exports = User;