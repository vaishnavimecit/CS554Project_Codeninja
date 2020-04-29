const hospitalData = require("../data").hospitals;
const express = require("express");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const hospital = await hospitalData.getById(id);
    res.json(hospital);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const hospital = await hospitalData.getByEmail(email);
    res.json(hospital);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const hospital = await hospitalData.createNew(req.body);
    res.json(hospital);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

module.exports = router;
