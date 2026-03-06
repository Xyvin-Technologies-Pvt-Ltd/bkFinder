const mongoose = require("mongoose");

const groupBookingSchema = new mongoose.Schema(
  {
    primaryContactName: {
      type: String,
      required: true,
      trim: true,
    },
    primaryContactPhone: {
      type: String,
      required: true,
      trim: true,
    },
    totalMembers: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    paymentId: {
      type: String,
      default: "",
    },
    orderId: {
      type: String,
      default: "",
    },
    razorpaySignature: {
      type: String,
      default: "",
    },

    userIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const GroupBooking = mongoose.model("GroupBooking", groupBookingSchema);

module.exports = GroupBooking;
