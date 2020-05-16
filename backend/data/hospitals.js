const firebaseUtils = require("./firebaseUtils");
const inspector = require("schema-inspector");
const firebase = require("firebase-admin");
const axios = require("axios");

const schema = {
  strict: true,
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    email: {
      type: "string",
      minLength: 3,
    },
    zip: {
      type: "string",
      minLength: 4,
    },
    city: {
      type: "string",
      optional: true,
    },
    state: {
      type: "string",
      optional: true,
    },
    google_id: {
      type: "string",
      optional: true,
    },
    urgency: {
      type: "string",
    },
    requestedItems: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          quantity: { type: "number" },
        },
      },
    },
    stats: {
      type: "object",
      properties: {
        cases: { type: "number" },
        weeksOfPpe: { type: "number" },
      },
    },
    location: {
      optional: true,
      type: "obejct",
      properties: {
        latitude: { type: "number" },
        longitude: { type: "number" },
      },
    },
    id: { type: "string", optional: true },
    instructions: { type: "string", optional: true },
    phone: { type: "number", optional: true },
  },
};

async function getAll() {
  try {
    const client = await firebaseUtils.getClient();
    const snapshot = await client.collection("hospitals").get();
    const hospitals = [];
    snapshot.forEach((doc) =>
      hospitals.push({
        id: doc.id,
        ...doc.data(),
      })
    );
    return hospitals;
  } catch (e) {
    throw new Error(e);
  }
}

async function updateGoogleId(id, g_id) {
  if (!id || !g_id) {
    throw new Error("Missing required fields to update google id");
  }
  try {
    const client = await firebaseUtils.getClient();
    const ref = client.collection("hospitals").doc(id);
    await ref.update({ google_id: g_id });
    const data = await ref.get();
    return { id, ...data.data() };
  } catch (e) {
    throw new Error(e);
  }
}

async function getById(id) {
  if (!id) {
    throw new Error("id field required");
  }
  try {
    const client = await firebaseUtils.getClient();
    const ref = client.collection("hospitals").doc(id);
    const data = await ref.get();
    if (data.exists) {
      return { id, ...data.data() };
    } else {
      throw new Error(`Document with id ${id} does not exist.`);
    }
  } catch (e) {
    throw new Error(e);
  }
}

async function getByGoogleId(gid) {
  if (!gid) {
    throw new Error("google id field required");
  }
  try {
    const client = await firebaseUtils.getClient();
    const colRef = client.collection("hospitals");
    const docRef = colRef.where("google_id", "==", gid);
    const snapshot = await docRef.get();
    let oneDoc = false;
    let document;
    snapshot.forEach((doc) => {
      if (oneDoc) {
        throw new Error("Duplicate Documents for google id " + gid);
      }
      oneDoc = true;
      document = { id: doc.id, ...doc.data() };
    });

    if (document) {
      return document;
    } else {
      throw new Error(`Document with google id ${gid} does not exist.`);
    }
  } catch (e) {
    throw e;
  }
}

async function getByEmail(email) {
  if (!email) {
    throw new Error("emial field required");
  }
  try {
    const client = await firebaseUtils.getClient();
    const colRef = client.collection("hospitals");
    const docRef = colRef.where("email", "==", email);
    const snapshot = await docRef.get();
    let oneDoc = false;
    let document;
    snapshot.forEach((doc) => {
      if (oneDoc) {
        throw new Error("Duplicate Documents for email " + email);
      }
      oneDoc = true;
      document = { id: doc.id, ...doc.data() };
    });

    if (document) {
      return document;
    } else {
      throw new Error(`Document with email ${email} does not exist.`);
    }
  } catch (e) {
    throw e;
  }
}

async function matchGoogleIds(ids) {
  if (!Array.isArray(ids)) {
    throw new Error("Argument must be array of google ids.");
  }
  try {
    const client = await firebaseUtils.getClient();
    const result = {};
    for (let i = 0; i < Math.ceil(ids.length / 10); i++) {
      const chunk = ids.slice(10 * i, 10 * (i + 1));
      const ref = client
        .collection("hospitals")
        .where("google_id", "in", chunk);
      const snapshot = await ref.get();
      snapshot.forEach((doc) => {
        result[doc.data().google_id] = {
          id: doc.id,
          ...doc.data(),
        };
      });
    }
    return result;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}

async function createNew(newHospitalObj) {
  console.log(newHospitalObj);
  const validation = inspector.validate(schema, newHospitalObj);
  if (!validation.valid) {
    throw new Error(validation.format());
  }
  delete newHospitalObj.id;
  const geo = await axios.get(
    `http://localhost:3001/locations/coordinates/${newHospitalObj.zip}`
  );
  newHospitalObj.location = new firebase.firestore.GeoPoint(
    geo.data.latitude,
    geo.data.longitude
  );
  try {
    const client = await firebaseUtils.getClient();
    const ref = await client.collection("hospitals").add(newHospitalObj);
    const data = await ref.get();
    return { id: ref.id, ...data.data() };
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  getAll,
  getById,
  createNew,
  getByEmail,
  updateGoogleId,
  matchGoogleIds,
  getByGoogleId,
};
