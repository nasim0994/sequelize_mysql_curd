module.exports = (sequelize, DataTypes) => {
  const OrderedProduct = sequelize.define("orderedProduct", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return OrderedProduct;
};
