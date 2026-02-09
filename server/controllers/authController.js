require("dotenv").config();

const fs = require('fs');
const path = require('path');

const login = (req, res) => {
  try {
    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    const logPath = path.join(__dirname, '..', 'debug-auth.txt');
    const logData = `[${new Date().toISOString()}] Attempt: "${email}" vs "${adminEmail}" | Pass: "${password}" vs "${adminPassword}"\n`;

    fs.appendFile(logPath, logData, (err) => {
      if (err) console.error("Log error", err);
    });

    console.log("Admin Login Attempt:", email);

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Trim strings to avoid whitespace issues
    if (email.trim() === adminEmail.trim() && password.trim() === adminPassword.trim()) {
      console.log("Admin Login Success");
      return res.status(200).json({ success: true, message: "Login successful" });
    } else {
      console.log("Admin Login Failed: Invalid credentials");
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Admin Login Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { login };