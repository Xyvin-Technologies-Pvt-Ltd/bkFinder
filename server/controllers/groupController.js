const crypto = require("crypto");
const User = require("../model/userModel");
const GroupBooking = require("../model/groupBookingModel");
const QRCode = require("qrcode");

const CLIENT_URL = "https://bkfinder.com";

const VISITOR_PACKAGE_PRICES = {
  with_food: 1499,
  without_food: 999,
};

const registerGroup = async (req, res) => {
  try {
    const { primaryContact, members, payment, packageType } = req.body;

    if (!primaryContact || !primaryContact.name || !primaryContact.phone) {
      return res.status(400).json({ message: "primaryContact.name and primaryContact.phone are required" });
    }

    if (!Array.isArray(members) || members.length === 0) {
      return res.status(400).json({ message: "members must be a non-empty array" });
    }

    if (!payment || !payment.paymentId || !payment.orderId || !payment.signature) {
      return res.status(400).json({ message: "payment.paymentId, payment.orderId and payment.signature are required" });
    }

    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!razorpaySecret) {
      return res.status(500).json({ message: "RAZORPAY_KEY_SECRET is not configured" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", razorpaySecret)
      .update(`${payment.orderId}|${payment.paymentId}`)
      .digest("hex");

    if (expectedSignature !== payment.signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const totalMembers = members.length;
    const normalizedPackageType = packageType === "without_food" ? "without_food" : "with_food";
    const packagePrice = VISITOR_PACKAGE_PRICES[normalizedPackageType] ?? 1499;
    const totalAmount = totalMembers * packagePrice;

    const group = new GroupBooking({
      primaryContactName: primaryContact.name,
      primaryContactPhone: primaryContact.phone,
      totalMembers,
      totalAmount,
      paymentStatus: "paid",
      paymentId: payment.paymentId,
      orderId: payment.orderId,
      razorpaySignature: payment.signature,
      userIds: [],
    });

    await group.save();

    const createdUserIds = [];
    const usersResponse = [];

    for (const member of members) {
      const newUser = new User({
        name: member?.name,
        phone: member?.phone,
        place: member?.place || "",
        registrationType: "visitor",
        packageType: normalizedPackageType,
        paymentStatus: "paid",
        paymentId: payment.paymentId,
        orderId: payment.orderId,
        paymentAmount: packagePrice,
        paymentDate: new Date(),
        groupId: group._id,
        isGroupMember: true,
      });

      const cardUrl = `${CLIENT_URL}/card/${newUser._id}`;
      newUser.cardUrl = cardUrl;
      newUser.qr = await QRCode.toDataURL(cardUrl);

      await newUser.save();

      createdUserIds.push(newUser._id);
      usersResponse.push({ id: newUser._id, cardUrl: newUser.cardUrl });
    }

    group.userIds = createdUserIds;
    await group.save();

    return res.status(201).json({
      success: true,
      groupId: group._id,
      users: usersResponse,
    });
  } catch (err) {
    console.error("Error registering group:", err);
    return res.status(500).json({ message: "Failed to register group" });
  }
};

const getGroupById = async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await GroupBooking.findById(groupId).populate("userIds");

    if (!group) {
      return res.status(404).json({ message: "Group booking not found" });
    }

    const users = (group.userIds || []).map((u) => ({
      id: u._id,
      name: u.name,
      cardUrl: u.cardUrl,
    }));

    return res.json({
      groupId: group._id,
      users,
    });
  } catch (err) {
    console.error("Error fetching group booking:", err);
    return res.status(500).json({ message: "Failed to fetch group tickets" });
  }
};

module.exports = {
  registerGroup,
  getGroupById,
};
