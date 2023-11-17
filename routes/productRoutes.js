const { addProducts, getProducts, updateProduct } = require("../controllers/productController");

const router = require("express").Router();


router.get("/", getProducts);
router.post("/", addProducts);
router.put("/:id", updateProduct);


module.exports = router;
