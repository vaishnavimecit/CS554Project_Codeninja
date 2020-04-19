const firebaseUtils = require("./firebaseUtils");
const inspector = require("schema-inspector");
const firebase = require("firebase-admin");

const schema = {
  strict: true,
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    location: {
      type: "obejct",
      properties: {
        latitude: { type: "number" },
        longitude: { type: "number" },
      },
    },
    items: {
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

async function createNew(newDonorObj) {
  const validation = inspector.validate(schema, newDonorObj);
  if (!validation.valid) {
    throw new Error(validation.format());
  }
  delete newDonorObj.id;
  newDonorObj.location = new firebase.firestore.GeoPoint(
    newDonorObj.location.latitude,
    newDonorObj.location.longitude
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
};

createNew({
  name: "Adam U",
  location: { latitude: 12.15, longitude: -12.05 },
  items: ["gloves", "scrubs"],
});
