const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routers
const productRoutes = require("./routes/productRoutes");
app.use("/product", productRoutes);

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
