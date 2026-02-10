const Razorpay = require("razorpay");
const axios = require("axios");
require("dotenv").config();

// Debugging
const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

console.log("------- Payment Controller Initialized -------");
console.log(`Key ID: ${keyId ? "Loaded" : "MISSING"}`);

// We are bypassing Razorpay SDK because of a system-wide Proxy issue
// that causes the SDK to crash or fail to connect.
// Using direct Axios with proxy: false solves this.

const createOrder = async (req, res) => {
    try {
        const { amount, currency = "INR" } = req.body;
        console.log(`Request: Create Order for ₹${amount}`);

        if (!amount) {
            return res.status(400).json({ message: "Amount is required" });
        }

        // Razorpay expects amount in paise (integer)
        const amountInPaise = Math.round(Number(amount) * 100);

        // Basic Auth Header
        const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

        try {
            const response = await axios({
                method: 'post',
                url: 'https://api.razorpay.com/v1/orders',
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    amount: amountInPaise,
                    currency: currency,
                    receipt: `receipt_${Date.now()}`
                },
                // CRITICAL: Ignore system proxy settings
                proxy: false,
                timeout: 10000 // 10s timeout
            });

            console.log("Order Created Successfully (Axios):", response.data.id);
            res.json(response.data);

        } catch (networkError) {
            console.error("Axios Connection Failed:");
            if (networkError.response) {
                console.error("Status:", networkError.response.status);
                console.error("Data:", networkError.response.data);
                return res.status(networkError.response.status).json(networkError.response.data);
            } else {
                console.error("Error Message:", networkError.message);
                return res.status(500).json({
                    message: "Payment Network Error",
                    error: networkError.message,
                    hint: "Check internet connection or firewall"
                });
            }
        }

    } catch (error) {
        console.error("Unexpected Controller Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { createOrder };
