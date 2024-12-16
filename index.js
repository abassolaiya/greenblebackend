const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "https://greenbletest.onrender.com",
    ],
    // origin:'http://127.0.0.1:3000'
  })
);

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/estimation", require("./routes/estimation"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/contact", require("./routes/contactRoutes"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
