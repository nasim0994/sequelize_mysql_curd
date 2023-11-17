module.exports = (sequelize, DataTypes) => {
  const Size = sequelize.define("size", {
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

  return Size;
};
