const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db"); // ✅ Import MongoDB connection

dotenv.config(); // ✅ Load .env variables

connectDB(); // ✅ Connect to MongoDB

const app = express();

app.use(cors());
app.use(express.json()); // parse JSON requests

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
