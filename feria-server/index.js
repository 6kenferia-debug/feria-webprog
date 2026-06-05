require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

// DATABASE
connectDB();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS (clean + production safe)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend.vercel.app" // replace later
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

// START SERVER (RENDER NEEDS THIS)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});