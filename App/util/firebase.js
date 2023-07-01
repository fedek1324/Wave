import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import firebaseConfig from "./firebaseConfig";

let app;
let auth;
let database;

export function initializeFirebase() {
    return new Promise((resolve, reject) => {
      // Initialize Firebase
      app = initializeApp(firebaseConfig); // if errors reject calls automaticly
  
      // Initialize Firebase Authentication and get a reference to the service
      auth = getAuth(app);
  
      database = getDatabase(app);
  
      resolve("api init ok");
    });
}

export function getAuthInstance() {
  return auth;
}

export function getDatabaseInstance() {
  return database;
}
