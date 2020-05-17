const hospitalData = require("../data").hospitals;
const express = require("express");
const router = express.Router();
const serviceAccount = require("../config/serviceAccountKey.json");
const mapsKey = serviceAccount.google_maps_key;
const bluebird = require("bluebird");
const redis = require("redis");
const redisClient = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const hospital = await hospitalData.getById(id);
    res.json(hospital);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const g_id = req.query.g_id;
    if (!id || !g_id) {
      throw new Error("Missing required prameters id/g_id");
    }
    const hospital = await hospitalData.updateGoogleId(id, g_id);
    const redisKey =
      "geo:" +
      String(hospital.location.latitude) +
      "," +
      String(hospital.location.latitude);
    redisClient.delAsync(redisKey);
    res.json(hospital);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.get("/google_id/:gid", async (req, res) => {
  try {
    const gid = req.params.gid;
    if (typeof gid !== "string") {
      throw new Error("Invalid google id provided");
    }
    const hospital = await hospitalData.getByGoogleId(gid);
    res.json(hospital);
  } catch (e) {
    console.log(e);
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

router.get("/getHospital/:set_gid", async (req, res) => {
  try {
    const gid = req.params.set_gid;
    if (typeof gid !== "string") {
      throw new Error("Invalid google id provided");
    }
    const hospital = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${mapsKey}&input=${gid}`
    );
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
