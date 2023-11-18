const dbConfig = require("../config/dbConfig.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connect success");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.products = require("./productModel.js")(sequelize, DataTypes);
db.sizes = require("./sizeModel.js")(sequelize, DataTypes);
db.colors = require("./colorModel.js")(sequelize, DataTypes);
db.orders = require("./orderModel.js")(sequelize, DataTypes);
db.stocks = require("./stockModel.js")(sequelize, DataTypes);
db.orderedProducts = require("./orderedProductModel.js")(sequelize, DataTypes);
 

db.products.hasMany(db.stocks, { as: "productStocks" });
db.stocks.belongsTo(db.products, { foreignKey: "productId", as: "product" });
db.sizes.hasMany(db.stocks, { as: "sizeStock" });
db.stocks.belongsTo(db.sizes, { foreignKey: "sizeId", as: "size" });
db.colors.hasMany(db.stocks, { as: "colorStock" });
db.stocks.belongsTo(db.colors, { foreignKey: "colorId", as: "color" });

db.orders.hasMany(db.orderedProducts, { as: "orderedProducts" });
db.orderedProducts.belongsTo(db.orders, { foreignKey: "orderId", as: "order" });

db.products.hasMany(db.orderedProducts, { as: "orderedProducts" });
db.orderedProducts.belongsTo(db.products, { foreignKey: "productId", as: "product" });
db.sizes.hasMany(db.orderedProducts, { as: "orderedProducts" });
db.orderedProducts.belongsTo(db.sizes, { foreignKey: "sizeId", as: "size" });
db.colors.hasMany(db.orderedProducts, { as: "orderedProducts" });
db.orderedProducts.belongsTo(db.colors, { foreignKey: "colorId", as: "color" });





// db.sequelize.sync({ force: false });

module.exports = db;
