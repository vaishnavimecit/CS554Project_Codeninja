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

router.get("/email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const donor = await donorData.getByEmail(email);
    res.json(donor);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const donor = await donorData.createNew(req.body);
    res.json(donor);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

module.exports = router;
