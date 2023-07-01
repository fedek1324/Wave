import { get, child, ref, set } from "firebase/database";
import { getDatabaseInstance } from "./firebase";

export function createUser(userId, userData) {
  const database = getDatabaseInstance();

  return new Promise((resolve, reject) => {
    set(ref(database, `/users/${userId}`), userData)
      .then(() => resolve())
      .catch((err) => reject(err));
  });
}

export function getUser(userId) {
  const database = getDatabaseInstance();

  return new Promise((resolve, reject) => {
    get(child(ref(database, "/users"), userId))
      .then((snapshot) => resolve(snapshot.val()))
      .catch((err) => reject(err));
  });
}
