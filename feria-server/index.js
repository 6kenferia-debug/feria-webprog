require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();


//DATABASE CONNECTION
connectDB();

//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CORS CONFIG
const corsOptions = {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

//TEST ROUTE (FIX for "Cannot GET /")
app.get("/", (req, res) => {
    res.send("API Running 🚀");
});

//  ROUTES
app.use("/api/users", userRoutes);
// Compatibility: frontend may hit /api/api/users
app.use("/api/api/users", userRoutes);

// also support no-slash variant (defensive)
app.use("/api/api/users/", userRoutes);

app.use("/api/articles", articleRoutes);
// Compatibility: frontend may hit /articles directly
app.use("/articles", articleRoutes);

// (Optional) seed endpoint uses /api/articles/seed, so no extra route required.



//  ERROR HANDLING

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Server Error" });
});

//   START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});