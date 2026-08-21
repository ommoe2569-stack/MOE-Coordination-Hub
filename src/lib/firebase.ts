import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {
  projectId: "bustling-horizon-3f6jr",
  appId: "1:935646245008:web:1011ad7d3a0433ef57e815",
  apiKey: "AIzaSyAL1R66I3S172tv2JhKdgQD4WEMKMfRPKU",
  authDomain: "bustling-horizon-3f6jr.firebaseapp.com",
  storageBucket: "bustling-horizon-3f6jr.firebasestorage.app",
  messagingSenderId: "935646245008",
  measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app, "ai-studio-moecoordinationh-467457ec-3eec-4c08-8b2b-4a1425a73a89");

// Attempt to enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    console.warn("Multiple tabs open, persistence can only be enabled in one tab at a a time.");
  } else if (err.code === "unimplemented") {
    console.warn("The current browser does not support all of the features required to enable persistence");
  }
});
