const express = require("express");
const router = express.Router();
const axios = require("axios");
const serviceAccount = require("../config/serviceAccountKey.json");
const mapsKey = serviceAccount.google_maps_key;
const hospitalData = require("../data/hospitals");

router.get("/coordinates/:zipcode", async (req, res) => {
  const zipcode = req.params.zipcode;
  if (typeof zipcode !== "string" && zipcode.length < 5) {
    res.status(422).json({ error: "Invalid zipcode entered." });
    return;
  }
  try {
    const zipRes = await axios({
      method: "get",
      url: `https://maps.googleapis.com/maps/api/geocode/json?key=${mapsKey}&components=postal_code:${zipcode}`,
    });
    if (zipRes.data.status !== "OK") {
      throw new Error(
        "Invalid Status returned from GoogleAPI " + zipRes.data.status
      );
    }
    const longitude = zipRes.data.results[0].geometry.location.lng;
    const latitude = zipRes.data.results[0].geometry.location.lat;
    const address = zipRes.data.results[0].formatted_address;
    const placeId = zipRes.data.results[0].place_id;
    res.json({ longitude, latitude, address, placeId });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

router.get("/hospitals", async (req, res) => {
  const longitude = parseFloat(req.query.longitude);
  const latitude = parseFloat(req.query.latitude);
  if (isNaN(longitude) || longitude > 90 || longitude < -90) {
    res.status(422).json({
      error: `Invalid value '${req.query.longitude}' for longitude param.`,
    });
    return;
  }
  if (isNaN(latitude) || latitude > 90 || latitude < -90) {
    res.status(422).json({
      error: `Invalid value '${req.query.latitude}' for latitude param.`,
    });
    return;
  }

  try {
    const locRes = await axios({
      method: "get",
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${mapsKey}&location=${latitude},${longitude}&rankby=distance&type=hospital`,
    });
    const hospitals = {};
    const addresses = {};
    locRes.data.results.forEach((hospital) => {
      if (addresses[hospital.vicinity]) {
        return;
      }
      hospitals[hospital.place_id] = {
        name: hospital.name,
        location: {
          latitude: hospital.geometry.location.lat,
          longitude: hospital.geometry.location.lng,
        },
        google_id: hospital.place_id,
        address: hospital.vicinity,
        icon: hospital.icon,
      };
      addresses[hospital.vicinity] = true;
    });
    const google_ids = Object.keys(hospitals);
    const matches = await hospitalData.matchGoogleIds(google_ids);
    google_ids.forEach((id) => {
      if (matches[id] !== undefined) {
        hospitals[id].isSignedUp = true;
        hospitals[id].data = matches[id];
      } else {
        hospitals[id].isSignedUp = false;
      }
    });
    res.json(google_ids.map((id) => hospitals[id]));
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

module.exports = router;
