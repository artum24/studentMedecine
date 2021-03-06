import firebase from "./firebase";

const firestore = firebase.firestore();

export function createUser(uid, data) {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function createRecord(uid, data) {
  return firestore
    .collection("records")
    .doc(uid)
    .set({ ...data }, { merge: true });
}
