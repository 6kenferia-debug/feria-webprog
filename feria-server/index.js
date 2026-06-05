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
    origin: (origin, callback) => {
        // Dynamically allow the requesting origin to work with credentials: true
        callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200 // For legacy browser support
};

// MIDDLEWARE
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TEST ROUTE (FIX for "Cannot GET /")
app.get("/", (req, res) => {
    res.send("API Running 🚀");
});

// ROUTES
app.use("/api/users", userRoutes);

// Compatibility: frontend may hit /api/api/users
app.use("/api/api/users", userRoutes);

// Also support no-slash variant (defensive)
app.use("/api/api/users/", userRoutes);

app.use("/api/articles", articleRoutes);

// Compatibility: frontend may hit /articles directly
app.use("/articles", articleRoutes);


// ERROR HANDLING
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Server Error" });
});

// START SERVER (Only runs when testing locally)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running locally on port ${PORT}`);
    });
}

// CRITICAL FOR VERCEL DEPLOYMENT
module.exports = app;