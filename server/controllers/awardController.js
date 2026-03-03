const Award = require("../model/awardModel");

const createAward = async (req, res) => {
  try {
    const {
      name,
      companyName,
      position,
      phone,
    } = req.body;

    const award = await Award.create({
      name,
      companyName,
      position,
      phone,
    });

    res.status(201).json({
      message: "Award nomination created successfully",
      award,
    });
  } catch (error) {
    console.error("Error creating award nomination", error);
    res.status(500).json({ error: "Failed to create award nomination" });
  }
};

const getAwards = async (req, res) => {
  try {
    const awards = await Award.find().sort({ createdAt: -1 });
    res.status(200).json(awards);
  } catch (error) {
    console.error("Error fetching awards", error);
    res.status(500).json({ error: "Failed to fetch award nominations" });
  }
};

module.exports = { createAward, getAwards };
