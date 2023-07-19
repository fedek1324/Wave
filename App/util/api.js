// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  getDatabase,
  child,
  ref,
  set,
  get,
  push,
  update,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";

import {
  getAuthInstance,
  getDatabaseInstance,
  initializeFirebase,
} from "./firebaseApiFunctions/firebase";

import {
  getAllChannelsExcept,
  isChannelExists,
  createChannel
} from "./firebaseApiFunctions/channels"

import {
  getChannelKeyFromName,
  getChannelKeysFromNames,
  getChannelNameFromKey,
} from "./firebaseApiFunctions/channelsUtils";

export {
  getAllChannelsExcept,
  isChannelExists,
  createChannel
} // re-export doesnt work

export {
  getChannelKeyFromName,
  getChannelKeysFromNames,
  getChannelNameFromKey,
}

let auth;
let database;

// function list

// apiInit                  here
// initializeFirebase       ./firebase

// getChannelKeyFromName    ./channelsUtils
// getChannelKeysFromNames  ./channelsUtils
// getChannelNameFromKey    ./channelsUtils
// getAllChannelsExcept     ./channels
// isChannelExists          ./channels
// createChannel            ./channels

// setChannelsToUser
// setUserToChannels
// setUserChannels accepts channelNames


// getUserById
// createUser
// signInAnonymouslyMy
// signInWithEmail
// getCurrentUser
// logOut

// createMessage
// getChannelsArrayFromKeys
// getCurrentUserChannelsKeys
// getChannelMessages
// getUserLatestMessages


export async function apiInit() {
  await initializeFirebase();
  auth = getAuthInstance();
  database = getDatabaseInstance();
}


export const getUserById = (userId) => {
  // Обернули промис в промис
  // Изначально я не понимал почему
  // get.then( (snapshot)=> return snapshot.val())
  // Ничего не возвращет в функцию getUser в которой он прописан
  // Это потому что он возвращал в контекст then()
  // Нельзя вернуть зн-е из промиса из функции в которой он вызван
  // Сейчас он возвращает результат в resolve который стоит выше в контексте
  // Мы вызываем промис который вызывает другой пропис и получает его результат в resolve
  // Всё это чтобы пользователю не пришлось вызывать get(..) и потом делать result.val()
  const dbRef = ref(database);
  const getUserFireBasePromise = get(child(dbRef, `users/${userId}`)); // Promise
  return new Promise((resolve, reject) => {
    getUserFireBasePromise.then((snapshot) => {
      if (snapshot.exists()) {
        resolve(snapshot.val());
      } else {
        reject(Error("No user data available"));
      }
    });
  });
};

export const getChannelById = (channelId) => {
  const dbRef = ref(database);
  const getChannelFireBasePromise = get(child(dbRef, `channels/${channelId}`)); // Promise
  return new Promise((resolve, reject) => {
    getChannelFireBasePromise.then((snapshot) => {
      if (snapshot.exists()) {
        const newChannelObject = { key: channelId, ...snapshot.val() };
        console.log("getChannelById: got channel", newChannelObject);
        resolve(newChannelObject);
      } else {
        reject(Error(`No channel available with key ${channelId}`));
      }
    });
  });
};

// TODO rename getChannelById to getChannelByKEy
function getChannelsArrayFromKeys(channelKeys) {
  const dbRef = ref(database);
  return new Promise((resolve, reject) => {
    const getChannelPromises = [
      ...channelKeys.map((channelId) => getChannelById(channelId)),
    ];
    Promise.all(getChannelPromises)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export const getUserChannels = (userId) => {
  const dbRef = ref(database);
  return new Promise((resolve, reject) => {
    getUserById(userId).then((user) => {
      const channelIds = Object.keys(user.channels);
      getChannelsArrayFromKeys(channelIds).then((channelsArray) => {
        resolve(channelsArray);
      });
    });
  });
};

const createUser = (email, password) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user", user);
        resolve(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode", errorCode);
        console.log("errorMessage", errorMessage);
        // ..
        reject(errorMessage);
      });
  });
};

// may be registration or login
export function signInAnonymouslyMy() {
  return new Promise((resolve, reject) => {
    signInAnonymously(auth)
      .then(() => {
        resolve("sign in anonimously ok");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(error);
      });
  });
}

export function signInWithEmail(email, password) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUserChannels(user.uid, ["НГТУ им Р. Е. Алексеева"]).then(
          (setChannelResult) => {
            resolve(user);
          }
        );
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(errorMessage);
      });
  });
}

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        resolve(user);
        // console.log(user);
        // ...
      } else {
        // User is signed out
        // ...
        // console.log("error getting user");
        resolve(null);
      }
    });
  });
}

export function isUserAdmin(uid) {
  return new Promise((resolve, reject) => {
    getCurrentUser().then((user) => {
      console.log("isUserAdmin got user", user);
      resolve(!user.isAnonymous);
    });
  });
}

export function logOut() {
  return new Promise((resolve, reject) => {
    auth
      .signOut()
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function createMessage(channelId, text, title) {
  return new Promise((resolve, reject) => {
    const dbRef = ref(database);
    const newMessageKey = push(
      child(dbRef, `messagesByChannels/${channelId}`)
    ).key;
    const updates = {};
    updates[`/messagesByChannels/${channelId}/${newMessageKey}`] = {
      title,
      text,
      timeStamp: Date.now(),
    };
    update(dbRef, updates).then((updateRes) => {
      // updateRes is undefined
      resolve("Message send");
    });
  });
}

export function getCurrentUserChannelsKeys() {
  return new Promise((resolve, reject) => {
    getCurrentUser().then((userAccount) => {
      console.log("got userAccount", userAccount.uid);
      getUserById(userAccount.uid).then((userData) => {
        const userChannels = Object.keys(userData.channels);
        resolve(userChannels);
      });
    });
  });
}

export async function getChannelMessages(channelKey) {
  try {
    const dbRef = ref(database);
    const snapshot = await get(
      child(dbRef, `messagesByChannels/${channelKey}`)
    );
    const messages = snapshot.val();

    if (!snapshot.exists()) {
      console.log("getChannelMessages: no messages");
      return [];
    }

    console.log("getChannelMessages messages old format", messages);

    const channelName = await getChannelNameFromKey(channelKey);
    const newMessages = Object.values(messages).map((message) => ({
      channelName,
      ...message,
    }));

    return newMessages;
  } catch (error) {
    console.error("getChannelMessages error", error);
    throw error;
  }
}

export async function getUserLatestMessages() {
  // TODO Add algoritm to not load all messages
  try {
    const channels = await getCurrentUserChannelsKeys();
    const getChannelMessagesPromises = channels.map((channelKey) =>
      getChannelMessages(channelKey)
    );
    const channelMessagesArray = await Promise.all(getChannelMessagesPromises);
    const allMessages = channelMessagesArray.flat();
    const sortedMessages = allMessages.sort(
      (a, b) => b.timeStamp - a.timeStamp
    );
    console.log("getUserLatestMessages: sortedMessages", sortedMessages);
    return sortedMessages;
  } catch (error) {
    console.error("getUserLatestMessages: error", error);
    throw error;
  }
}
