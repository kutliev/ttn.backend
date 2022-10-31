require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const PORT = process.env.PORT || 5000;
const connectionString = process.env.MONGO_CONNECTION_STRING || "";

const app = express();
app.use(express.json());
app.use("/api", routes);

const start = async () => {
  try {
    await mongoose.connect(connectionString);
    app.listen(PORT, () => {
      console.log(`***SERVER RUNS AT PORT ${PORT}`);
    });
  } catch (e) {
    console.log("***ERROR", e.message);
  }
};

start();
