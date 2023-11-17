const db = require("../models");
const Product = db.products;
const Stock = db.stocks;

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          association: "productStocks",
          include: [
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
    res.send(products);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving products.",
    });
  }
};

module.exports.addProducts = async (req, res) => {
  try {
    const { title, price, stocks } = req.body;

    const product = await Product.create({
      title,
      price
    });

    stocks.map(async (stock) => {
      const { sizeId, colorId, quantity } = stock;
      await product.createProductStock({
        sizeId,
        colorId,
        quantity,
      });
    });

    res.send(product);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the Product.",
    });
  }
}

module.exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, updatedStock } = req.body;

    const product = await Product.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    product.title = title;
    product.price = price;

    await product.save();

    for (const stock of updatedStock) {
      const { sizeId, colorId, quantity } = stock;
      const productStock = await Stock.findOne({
        where: {
          productId: id,
          sizeId,
          colorId,
        },
      });

      if (!productStock) {
        await product.createProductStock({
          sizeId,
          colorId,
          quantity,
        });
      } else {
        productStock.quantity = quantity;
        await productStock.save();
      }
    }

    res.send(product);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating the Product.",
    });
  }
};
