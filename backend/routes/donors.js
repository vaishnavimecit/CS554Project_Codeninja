const donorData = require("../data").donors;
const express = require("express");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const donor = await donorData.getById(id);
    res.json(donor);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
