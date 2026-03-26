const express = require("express");
const { createCanvas, loadImage } = require("canvas");
const path = require("path");
const fs = require("fs");
const User = require("../model/userModel");

const router = express.Router();

/* helper: rounded left rectangle */
// function drawRoundedLeftRect(ctx, x, y, w, h, r) {
//   ctx.beginPath();
//   ctx.moveTo(x + r, y);
//   ctx.lineTo(x + w, y);
//   ctx.lineTo(x + w, y + h);
//   ctx.lineTo(x + r, y + h);
//   ctx.quadraticCurveTo(x, y + h, x, y + h - r);
//   ctx.lineTo(x, y + r);
//   ctx.quadraticCurveTo(x, y, x + r, y);
//   ctx.closePath();
// }

function drawRoundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/* helper: load remote image */
const loadImageFromUrl = async (url) => {
  const res = await fetch(url);
  const buf = Buffer.from(await res.arrayBuffer());
  return loadImage(buf);
};

router.get("/image/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");

    const WIDTH = 1080;
    const HEIGHT = 1350;

    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    /* BACKGROUND */
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    /* FRAME */
    const defaultFramePath = path.join(__dirname, "../public/frame/frame.jpg");
    const vipFramePath = path.join(__dirname, "../public/frame/vip-frame.jpg");
    const exhibitorFramePath = path.join(__dirname, "../public/frame/Exhibitor-pass.jpg");
    const delegateFramePath = path.join(__dirname, "../public/frame/Participating.jpg.jpeg");
    const visitorWithoutFoodFramePath = path.join(__dirname, "../public/frame/Participating with out food.jpg.jpeg");

    let framePath = defaultFramePath;
    if (user.registrationType === "vip" && fs.existsSync(vipFramePath)) {
      framePath = vipFramePath;
    }
    if (user.registrationType === "delegate" && fs.existsSync(delegateFramePath)) {
      framePath = delegateFramePath;
    }
    if (user.registrationType === "exhibitor" && fs.existsSync(exhibitorFramePath)) {
      framePath = exhibitorFramePath;
    }

    if (
      user.registrationType === "visitor" &&
      user.packageType === "without_food" &&
      fs.existsSync(visitorWithoutFoodFramePath)
    ) {
      framePath = visitorWithoutFoodFramePath;
    }

    const frame = await loadImage(framePath);
    ctx.drawImage(frame, 0, 0, WIDTH, HEIGHT);

    /* USER PHOTO (centered like React) */
    if (user.photo) {
      const photo = await loadImageFromUrl(user.photo);
      const photoWidth = 340;
      const photoHeight = Math.round(photoWidth * 6 / 5);
      const photoX = 540;
      const photoY = 690;

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(photoX, photoY, photoWidth, photoHeight, 20);
      ctx.clip();
      ctx.drawImage(photo, photoX, photoY, photoWidth, photoHeight);
      ctx.restore();
    }

    /* NAME BOX  */

    const paddingX = 28;
    const paddingY = 26;
    const gap = 14;

    // Center-align text for the name plate
    ctx.textAlign = "center";

    const displayName = (user.name || "").toUpperCase();
    // Line under the name:
    //  - visitors: show place (with Kochi fallback)
    //  - stall/award: prefer company name (cName), fallback to place/Kochi
    let lineText;
    if (user.registrationType === "stall" || user.registrationType === "award") {
      if (user.cName && user.cName.trim()) {
        lineText = user.cName;
      } else if (user.place && user.place.trim()) {
        lineText = user.place;
      } else {
        lineText = "Kochi";
      }
    } else {
      lineText = (user.place && user.place.trim()) ? user.place : "Kochi";
    }

    const displayPlace = (lineText || "Kochi").toUpperCase();

    let badgeText = "";
    if (user.registrationType === "award") {
      badgeText = "BUSINESS AWARD NOMINEE";
    } else if (user.registrationType === "stall") {
      badgeText = "STALL";
    } else if (user.registrationType === "vip") {
      badgeText = "";
    } else if (user.registrationType === "delegate") {
      badgeText = "";
    } else if (user.registrationType === "exhibitor") {
      badgeText = "";
    } else {
      // default visitor badge
      badgeText = "VISITOR";
    }

    const isVip = user.registrationType === "vip";
    const isDelegate = user.registrationType === "delegate";
    const isExhibitor = user.registrationType === "exhibitor";
    const isGuestPass = isVip || isDelegate;
    const nameFont = isVip || isDelegate ? "bold 38px sans-serif" : "bold 40px sans-serif";
    const placeFont = isVip || isDelegate ? "34px sans-serif" : "36px sans-serif";
    const badgeFont = "bold 30px sans-serif";

    /* NAME */
    ctx.font = nameFont;

    const nameTextWidth = ctx.measureText(displayName).width;

    /* PLACE */
    ctx.font = placeFont;
    const placeTextWidth = ctx.measureText(displayPlace).width;

    /* BADGE */
    ctx.font = badgeFont;

    const badgeTextWidth = ctx.measureText(badgeText).width;

    /* BOX SIZE (dynamic) */
    const contentWidth = Math.max(nameTextWidth, placeTextWidth, badgeTextWidth);
    const boxWidth = contentWidth + paddingX * 2;

    const boxHeight =
      paddingY * 2 +
      40 +
      (gap + 34) +
      (badgeText ? gap + 30 : 0);

    /* POSITION: horizontally centered; used as reference for text + QR */
    const boxX = (WIDTH - boxWidth) / 2;
    const boxY = (isExhibitor || isGuestPass) ? 540 : 520;

    /* DRAW NAME / PLACE / BADGE (black text, stacked) */
    ctx.fillStyle = "#000000";

    let currentY = boxY + paddingY + 40;

    // Name
    ctx.font = nameFont;
    ctx.fillText(displayName, boxX + boxWidth / 2, currentY);

    // Place (always render line between name and badge)
    currentY += gap + 34;
    ctx.font = placeFont;
    ctx.fillText(displayPlace, boxX + boxWidth / 2, currentY);

    // Badge line
    if (badgeText) {
      // add a bit more space below place before the badge
      currentY += gap + 40;

      ctx.font = badgeFont;

      // Badge background box sized to text
      const badgePaddingX = 32;
      const badgePaddingY = 14;

      const badgeTextWidthForBox = ctx.measureText(badgeText).width;
      const badgeBoxWidth = badgeTextWidthForBox + badgePaddingX * 2;
      const badgeBoxHeight = 30 + badgePaddingY * 2;
      const badgeBoxX = (WIDTH - badgeBoxWidth) / 2;
      const badgeBoxY = currentY - 30 - badgePaddingY;

      // Themed background (green default; gold for VIP)
      ctx.fillStyle = user.registrationType === "vip" ? "#b45309" : "#0f766e";
      drawRoundedRect(ctx, badgeBoxX, badgeBoxY, badgeBoxWidth, badgeBoxHeight, 18);
      ctx.fill();

      // Badge text in white on top
      ctx.fillStyle = "#ffffff";
      ctx.fillText(badgeText, boxX + boxWidth / 2, currentY);

      // Restore fillStyle to black for anything drawn later
      ctx.fillStyle = "#000000";
    }

    /* QR - centered below the name, slightly larger */
    if (user.qr) {
      const qr = await loadImageFromUrl(user.qr);
      const qrSize = (isExhibitor || isGuestPass) ? 260 : 240;
      const qrX = (WIDTH - qrSize) / 2;
      const qrY = boxY + boxHeight + ((isExhibitor || isGuestPass) ? -20 : 0);
      ctx.drawImage(qr, qrX, qrY, qrSize, qrSize);
    }

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "no-store");
    res.send(canvas.toBuffer("image/png"));

  } catch (err) {
    console.error("CARD IMAGE ERROR:", err);
    res.status(500).send("Image generation failed");
  }
});

module.exports = router;