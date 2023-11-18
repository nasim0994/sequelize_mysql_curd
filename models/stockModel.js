module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define("stock", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  });

  return Stock;
};
