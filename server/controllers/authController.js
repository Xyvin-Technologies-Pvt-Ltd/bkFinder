require("dotenv").config();

const login = (req, res) => {
  console.log("Login hit with body:", req.body);
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email === adminEmail && password === adminPassword) {
    console.log("LOGIN SUCCESS");
    return res.status(200).json({ success: true, message: "Login successful" });
  } else {
    console.log("LOGIN FAILED. Mismatch:");
    console.log(`Received: '${email}' | '${password}'`);
    console.log(`Expected: '${adminEmail}' | '${adminPassword}'`);
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
};

module.exports = { login };