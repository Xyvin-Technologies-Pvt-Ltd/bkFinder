require("dotenv").config();

// FIX: Unset malformed proxy variables that might cause "Invalid URL" errors
delete process.env.HTTP_PROXY;
delete process.env.HTTPS_PROXY;
delete process.env.http_proxy;
delete process.env.https_proxy;

const express = require('express');
const cors = require('cors');
const dbConnection = require('./config/dbconnect');
const router = require('./routes/userRoutes');
const groupRoutes = require("./routes/groupRoutes");
const authRouter = require('./routes/authRoutes');
const stallRouter = require('./routes/stallRoutes');
const path = require('path');
const cardPdfRouter = require("./routes/cardPdf");
const awardRouter = require("./routes/awardRoutes");
const adminRouter = require('./routes/adminRoutes');

const app = express();


// Debugging Middleware: Log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://bkfinder.com",
  "https://www.bkfinder.com",
  "https://admin.bkfinder.com",
];

app.use(cors({
  origin: true, // Temporarily allow all origins for debugging
  credentials: true,
}));

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/frame", express.static(path.join(__dirname, "public/frame")));


dbConnection();

app.use("/api/users", router);
app.use("/api/users", groupRoutes);
app.use("/api/auth", authRouter);
app.use("/api/stall", stallRouter);
app.use("/api/card-pdf", cardPdfRouter);
app.use("/api/card", require("./routes/cardImage"));
app.use("/api/awards", awardRouter);
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/admin", adminRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`SERVER RUNNING → ${PORT}`));