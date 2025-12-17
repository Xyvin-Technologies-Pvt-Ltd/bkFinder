
const express = require("express");
const puppeteer = require("puppeteer");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 1080,
    height: 1350,
    deviceScaleFactor: 2,
  });

  await page.goto(`https://bkfinder.com/card/${id}`, {
    waitUntil: "networkidle0",
  });

  const pdf = await page.pdf({
    width: "1080px",
    height: "1350px",
    printBackground: true,
  });

  await browser.close();

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=card-${id}.pdf`,
  });

  res.send(pdf);
});

module.exports = router;