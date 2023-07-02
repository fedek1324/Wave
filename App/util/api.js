import {
  child,
  ref,
  set,
  get,
  push,
  update,
} from "firebase/database";

import {
  getAuthInstance,
  getDatabaseInstance,
  initializeFirebase,
} from "./firebaseApiFunctions/firebase";

import {
  getAllChannelsExcept,
  isChannelExists,
  createChannel,
  getChannelByKey
} from "./firebaseApiFunctions/channels"

import {
  setUserChannels,
} from "./firebaseApiFunctions/userChannels";

import {
  getChannelKeyFromName,
  getChannelKeysFromNames,
  getChannelNameFromKey,
  getChannelsArrayFromKeys
} from "./firebaseApiFunctions/channelsUtils";

import {
  logOut,
  getCurrentUser,
  isUserAdmin,
  signInAnonymouslyMy,
  signInWithEmail
} from "./firebaseApiFunctions/auth"

export {
  getAllChannelsExcept,
  isChannelExists,
  createChannel,
  getChannelByKey,

  setUserChannels,

  getChannelKeyFromName,
  getChannelKeysFromNames,
  getChannelNameFromKey,
  getChannelsArrayFromKeys,

  logOut,
  getCurrentUser,
  isUserAdmin,
  signInAnonymouslyMy,
  signInWithEmail
} // re-export doesnt work


// function list

// apiInit                  here
// initializeFirebase       ./firebase

// getChannelKeyFromName    ./channelsUtils
// getChannelKeysFromNames  ./channelsUtils
// getChannelNameFromKey    ./channelsUtils
// getChannelsArrayFromKeys ./channelsUtils
// getAllChannelsExcept     ./channels
// isChannelExists          ./channels
// createChannel            ./channels
// getChannelById           ./channels

// setChannelsToUser        ./userChannels.js     not in export
// setUserToChannels        ./userChannels.js     not in export
// setUserChannels          ./userChannels.js     accepts channelNames or channelKeys

// signInAnonymouslyMy      ./auth.js
// signInWithEmail          ./auth.js
// getCurrentUser           ./auth.js
// logOut                   ./auth.js
// isUserAdmin              ./auth.js

// createMessage                here
// getChannelMessages           here
// getUserLatestMessages        here
// getUserById                  here
// initUserChannelsList         here
// getCurrentUserChannelsKeys   here


let auth;
let database;

export async function apiInit() {
  await initializeFirebase();
  auth = getAuthInstance();
  database = getDatabaseInstance();
}

export const getUserById = (userId) => {
  const dbRef = ref(database);
  const getUserFireBasePromise = get(child(dbRef, `users/${userId}`)); // Promise
  return new Promise((resolve, reject) => {
    getUserFireBasePromise.then((snapshot) => {
      if (snapshot.exists()) {
        resolve(snapshot.val());
      } else {
        const err = new Error("No user data available");
        err.name = "NoUserData"
        reject(err);
      }
    });
  });
};

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


export async function initUserChannelsList() {
  return new Promise((resolve, reject) => {
    getCurrentUser()
        .then(user => {
          setUserChannels({userId: user.uid, channelsNames : ["НГТУ им Р. Е. Алексеева"]}).then(
            (setChannelResult)=> {
              resolve(true);
            }
          );
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          reject(errorMessage);
        });
  });
}


export function getCurrentUserChannelsKeys() {
  return new Promise((resolve, reject) => {
    getCurrentUser().then((userAccount) => {
      console.log("got userAccount", userAccount.uid);
      getUserById(userAccount.uid)
        .then((userData) => {
          const userChannels = Object.keys(userData.channels);
          resolve(userChannels);
        })
        .catch(err => reject (err));
    });
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
  // TODO Add algorithm to not load all messages
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
