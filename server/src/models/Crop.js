const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Crop = sequelize.define("Crop", {
    cropName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pricePerKg: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Crop;