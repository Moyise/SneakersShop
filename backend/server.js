const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const open = require("open");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 5000;

app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

if (process.env.NODE_ENV === "production") {
  const root = path.join("frontend", "build");
  console.log(root);
  app.use(express.static(root));

  app.get("*", (req, res) => res.sendFile("index.html", { root }));
} else {
  app.get("/", (req, res) => res.send("API is running..."));
}

(function wakeUp() {
  open("https://mysneaker.herokuapp.com/", (err) => {
    if (err) throw err;
    console.log("Woke up!");
    setTimeout(wakeUp, 1.74e6); //29m
  });
})();

app.listen(PORT, () => console.log(`ShoeShop app listening on port ` + PORT));
