module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define("color", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Color;
};