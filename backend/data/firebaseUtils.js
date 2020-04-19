const admin = require("firebase-admin");

const serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://make-a-change-697da.firebaseio.com",
});

async function getClient() {
  try {
    const db = await admin.firestore();
    return db;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getClient,
};
