require("dotenv").config();
const express = require('express');
const cors = require('cors');
const dbConnection = require('./config/dbconnect');
const router = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const stallRouter = require('./routes/stallRoutes');
const path = require('path');
const cardPdfRouter = require("./routes/cardPdf");
const awardRouter = require("./routes/awardRoutes");

const app = express();

// Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log('Headers:', JSON.stringify(req.headers));
  console.log('Body:', JSON.stringify(req.body));
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const allowedOrigins = [
  "http://localhost:5173",
  "https://bkfinder.com",
  "https://www.bkfinder.com",
  "https://admin.bkfinder.com",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use("/frame", express.static(path.join(__dirname, "public/frame")));


dbConnection();

app.use("/api/users", router);
app.use("/api/auth", authRouter);
app.use("/api/stall", stallRouter);
app.use("/api/card-pdf", cardPdfRouter);
app.use("/api/card", require("./routes/cardImage"));
app.use("/api/awards", awardRouter);
app.use("/api/payment", require("./routes/paymentRoutes"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`SERVER RUNNING → ${PORT}`));