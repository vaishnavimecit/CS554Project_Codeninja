import firebase from "firebase/app";
import axios from "axios";

async function createDonor(email, password, profileData) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    firebase.auth().currentUser.updateProfile(profileData);
    const res = await axios.post("http://localhost:3001/donors", {
      email,
      ...profileData,
    });
    if (res.status !== 200) {
      throw new Error(
        "Error: Unable to create user in database. " + JSON.stringify(res.data)
      );
    }
  } catch (e) {
    console.log(e.message);
    if (e.message === "Request failed with status code 500") {
      throw new Error("Error: Unable to create user in database.");
    }
    throw e;
  }
}

async function createHospital(email, password, profileData) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    firebase.auth().currentUser.updateProfile(profileData);
    const res = await axios.post("http://localhost:3001/hospitals", {
      email,
      ...profileData,
    });
    if (res.status !== 200) {
      throw new Error(
        "Error: Unable to create user in database. " + JSON.stringify(res.data)
      );
    }
  } catch (e) {
    console.log(e.message);
    if (e.message === "Request failed with status code 500") {
      throw new Error("Error: Unable to create user in database.");
    }
    throw e;
  }
}

async function doChangePassword(email, oldPassword, newPassword) {
  let credential = firebase.auth.EmailAuthProvider.credential(
    email,
    oldPassword
  );
  await firebase.auth().currentUser.reauthenticateWithCredential(credential);
  await firebase.auth().currentUser.updatePassword(newPassword);
  await doSignOut();
}

async function doSignInWithEmailAndPassword(email, password) {
  await firebase.auth().signInWithEmailAndPassword(email, password);
}

async function doSocialSignIn(provider) {
  let socialProvider = null;
  if (provider === "google") {
    socialProvider = new firebase.auth.GoogleAuthProvider();
  } else if (provider === "facebook") {
    socialProvider = new firebase.auth.FacebookAuthProvider();
  }
  await firebase.auth().signInWithPopup(socialProvider);
}

async function doPasswordReset(email) {
  await firebase.auth().sendPasswordResetEmail(email);
}

async function doPasswordUpdate(password) {
  await firebase.auth().updatePassword(password);
}

async function doSignOut() {
  await firebase.auth().signOut();
}

export {
  createDonor,
  createHospital,
  doSocialSignIn,
  doSignInWithEmailAndPassword,
  doPasswordReset,
  doPasswordUpdate,
  doSignOut,
  doChangePassword,
};
