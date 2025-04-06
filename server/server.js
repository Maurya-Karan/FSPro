const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const foodRoutes = require("./routes/foodRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "https://fspro.onrender.com", // Ensure no trailing slash here
    credentials: true, // Allow cookies and authentication headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/food", foodRoutes);
app.use("/auth", userRoutes);

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
