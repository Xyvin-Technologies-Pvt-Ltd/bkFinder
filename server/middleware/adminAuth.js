const adminAuth = (req, res, next) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Check if admin credentials are provided in headers
  const email = req.headers['admin-email'];
  const password = req.headers['admin-password'];

  if (!email || !password) {
    return res.status(401).json({ error: "Admin credentials required" });
  }

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(403).json({ error: "Invalid admin credentials" });
  }

  next();
};

module.exports = adminAuth;
