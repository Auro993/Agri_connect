const User = require("./User");
const Crop = require("./Crop");
const Order = require("./Order");

// Define associations
User.hasMany(Crop, { foreignKey: 'userId' });
Crop.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Crop.hasMany(Order, { foreignKey: 'cropId' });
Order.belongsTo(Crop, { foreignKey: 'cropId' });

module.exports = {
    User,
    Crop,
    Order
};