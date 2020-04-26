const firebaseUtils = require("./firebaseUtils");
const inspector = require("schema-inspector");
const firebase = require("firebase-admin");
const axios = require("axios");

const schema = {
  strict: true,
  type: "object",
  properties: {
    name: {
      type: "object",
      properties: {
        first: { type: "string", minLength: 1 },
        last: { type: "string", minLength: 1 },
      },
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
    location: {
      type: "obejct",
      optional: true,
      properties: {
        latitude: { type: "number" },
        longitude: { type: "number" },
      },
    },
    items: {
      optional: true,
      type: "array",
      items: {
        type: "string",
      },
    },
    id: { type: "string", optional: true },
  },
};

async function getAll() {
  try {
    const client = await firebaseUtils.getClient();
    const snapshot = await client.collection("donors").get();
    const donors = [];
    snapshot.forEach((doc) =>
      donors.push({
        id: doc.id,
        ...doc.data(),
      })
    );
    return donors;
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
    const ref = client.collection("donors").doc(id);
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

async function getByEmail(email) {
  if (!email) {
    throw new Error("emial field required");
  }
  try {
    const client = await firebaseUtils.getClient();
    const colRef = client.collection("donors");
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

async function createNew(newDonorObj) {
  const validation = inspector.validate(schema, newDonorObj);
  if (!validation.valid) {
    throw new Error(validation.format());
  }
  delete newDonorObj.id;
  const geo = await axios.get(
    `http://localhost:3001/locations/coordinates/${newDonorObj.zip}`
  );
  newDonorObj.location = new firebase.firestore.GeoPoint(
    geo.data.latitude,
    geo.data.longitude
  );
  try {
    const client = await firebaseUtils.getClient();
    const ref = await client.collection("donors").add(newDonorObj);
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
};
