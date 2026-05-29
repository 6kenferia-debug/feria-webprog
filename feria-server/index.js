require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

// DATABASE CONNECTION
connectDB();

// CORS CONFIG
const corsOptions = {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

// MIDDLEWARE
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

    res.status(500).json({
        message: "Server Error",
    });
});

// START SERVER
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});