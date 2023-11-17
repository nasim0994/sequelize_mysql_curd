const db = require("../models");
const Order = db.orders;
const Stock = db.stocks;

module.exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          association: "orderedProducts",
          include: [
            {
              association: "product",
            },
            {
              association: "size",
            },
            {
              association: "color",
            },
          ],
        },
      ],
    });
    res.send(orders);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving orders.",
    });
  }
};

module.exports.addOrder = async (req, res) => {
  try {
    const { orderedProducts } = req.body;
    const total = orderedProducts.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);

    for (const product of orderedProducts) {
      const { productId, sizeId, colorId, quantity } = product;
      const stock = await Stock.findOne({
        where: {
          productId,
          sizeId,
          colorId,
        },
      });
      if (stock.quantity < quantity) {
        throw new Error(`Not enough stock for productId ${productId}`);
      }
    }


    const order = await Order.create({
      total
    });

    orderedProducts.map(async (product) => {
      const { productId, sizeId, colorId, quantity } = product;
      await Stock.decrement(
        { quantity },
        {
          where: {
            productId,
            sizeId,
            colorId,
          },
        }
      );
      await order.createOrderedProduct({
        productId,
        sizeId,
        colorId,
        quantity,
      });
    });

    res.send(order);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the Order.",
    });
  }
};