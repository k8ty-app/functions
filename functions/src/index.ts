import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.createUserDocOnSignUp = functions.auth.user().onCreate(async (user) => {
  const newUserDoc = db.collection("users").doc(user.uid);
  await newUserDoc.set({
    createdAt: Date.now(),
  });
});

exports.deleteUserDocOnDelete = functions.auth.user().onDelete(async (user) => {
  await db.collection("users").doc(user.uid).delete();
});

