const { getOrders, addOrder } = require("../controllers/orderController");

const router = require("express").Router();

router.get("/", getOrders);
router.post("/", addOrder);


module.exports = router;
