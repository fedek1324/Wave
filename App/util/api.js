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

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlLJAnOy-sSe9mknnf4KYdb9ToBOje2ps",
  authDomain: "wave-801a3.firebaseapp.com",
  projectId: "wave-801a3",
  storageBucket: "wave-801a3.appspot.com",
  messagingSenderId: "149847609223",
  appId: "1:149847609223:web:e7f6fa716851fb79590d22",
  databaseURL: "https://wave-801a3-default-rtdb.firebaseio.com",
};

let app;

let auth;

let database;

// TODO We now init in file but we can init on app launch maybe
// Initialize Firebase
app = initializeApp(firebaseConfig); // if errors reject calls automaticly

// Initialize Firebase Authentication and get a reference to the service
auth = getAuth(app);

database = getDatabase(app);

// function list

// getChannelKeyFromName
// getChannelKeysFromNames
// getChannelNameFromKey
// gellAllChannelsExcept

// setChannelsToUser
// setUserToChannels
// setUserChannels

// isChannelExists
// createChannel

// getUserById
// createUser
// signInAnonymouslyMy
// signInWithEmail
// getCurrentUser
// logOut

// createMessage
// getChannelsArrayFromKeys
// getCurrentUserChannels
// getChannelMessages
// getUserLatestMessages
// apiInit

function getChannelNameFromKey(channelKey) {
  return new Promise((resolve, reject) => {
    get(query(ref(database, `/channels/${channelKey}/name`)))
      .then((snapshot) => resolve(snapshot.val()))
      .catch((err) => reject(err));
  });
}

function getChannelKeyFromName(channelName) {
  return new Promise((resolve, reject) => {
    get(
      query(
        ref(database, "/channels"),
        orderByChild("name"),
        equalTo(channelName)
      )
    )
      .then((channel) => resolve(channel._node.children_.root_.key))
      .catch((err) => reject(err));
  });
}

function getChannelKeysFromNames(channelsArray) {
  return new Promise((resolve, reject) => {
    const getChannelKeyPromises = [];
    channelsArray.forEach((channelName) => {
      getChannelKeyPromises.push(getChannelKeyFromName(channelName));
    });
    Promise.all(getChannelKeyPromises).then((channelKeys) => {
      resolve(channelKeys);
    });
  });
}

// TODO optimize
export function gellAllChannelsExcept(channelsToExcludeKeys) {
  return new Promise((resolve, reject) => {
    get(query(ref(database, `/channels`)))
      .then((snapshot) => {
        const channelsObj = snapshot.val();
        const filteredChannelsObj = Object.fromEntries(
          Object.entries(channelsObj).filter(
            ([key, value]) => !channelsToExcludeKeys.includes(key)
          )
        );
        const channelsArray = Object.entries(filteredChannelsObj).map(
          (channelKeyValueObject) => {
            return {key: channelKeyValueObject[0], ...channelKeyValueObject[1]}
          }
        )
        console.log("channelsArray", channelsArray)
        const sortedChannelsArray = channelsArray.sort( (a, b) => {
          return a.name.localeCompare(b.name)
        })
        resolve(sortedChannelsArray);
      })
      .catch((err) => reject(err));
  });
}

function setChannelsToUser(userId, channelKeys) {
  return new Promise((resolve, reject) => {
    const channelsObj = {};
    channelKeys.forEach((channelKey) => {
      channelsObj[channelKey] = true;
    });
    set(ref(database, `users/${userId}/channels`), channelsObj).then(() =>
      resolve("channels weere set")
    );
  });
}

function setUserToChannels(userId, channelKeys) {
  const setUserPromises = [];
  return new Promise((resolve, reject) => {
    channelKeys.forEach((channelKey) => {
      const setUserPromise = set(
        ref(database, `channels/${channelKey}/users/${userId}`),
        true
      );
      setUserPromises.push(setUserPromise);
    });
    Promise.all(setUserPromises).then((res) =>
      resolve("user was set to channels")
    );
  });
}

export function setUserChannels(userId, channelsArray) {
  return new Promise((resolve, reject) => {
    getChannelKeysFromNames(channelsArray).then((channelKeys) => {
      const setChannelsToUserPromise = setChannelsToUser(userId, channelKeys);
      const setUserToChannelsPromise = setUserToChannels(userId, channelKeys);
      Promise.all([setChannelsToUserPromise, setUserToChannelsPromise]).then(
        (res) => {
          resolve("channels set to user and user set to channels");
        }
      );
    });
  });
}

export function isChannelExists(name) {
  return new Promise((resolve, reject) => {
    get(
      query(ref(database, "/channels"), orderByChild("name"), equalTo(name))
    ).then((res) => {
      console.log(`isExists ${name} result: ${res.val()}`);
      console.log("result .val() === null", res.val() === null);
      if (res.val() === null) resolve(false);
      else resolve(true);
    });
  });
}

export function createChannel(name, description, imageUrl, subscribers) {
  console.log("CREATING CHANNEL", name);
  return new Promise((resolve, reject) => {
    isChannelExists(name).then((res) => {
      // console.log("getChannel result", res.val());
      if (res) {
        // console.log("Creating channel exists promis");
        reject(new Error(`Channel "${name}" already exists`));
        return;
      }
      const dbRef = ref(database);
      const newChannelKey = push(child(dbRef, "channels")).key;
      const updates = {};
      updates[`/channels/${newChannelKey}`] = {
        name,
        description,
        imageUrl,
        subscribers,
      };
      // console.log("Creating channel promis");
      update(dbRef, updates).then((updateRes) => {
        resolve(updateRes);
      });
    });
  });
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

export function createMessage(channelId, title, text) {
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

export function getChannelMessages(channelKey) {
  return new Promise((resolve, reject) => {
    const dbRef = ref(database);
    get(child(dbRef, `messagesByChannels/${channelKey}`)).then((snapshot) => {
      const messages = snapshot.val();
      if (!snapshot.exists()) {
        console.log("getChannelMessages: no messages");
        resolve([]);
        return;
      }
      console.log("getChannelMessages messages old format", messages);
      let newMessages;
      getChannelNameFromKey(channelKey).then((channelName) => {
        newMessages = Object.values(messages).map((message) => {
          return {
            channelName,
            ...message,
          };
        });
        resolve(newMessages);
      });
    });
  });
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
    const sortedMessages = allMessages.sort((a, b) => b.timeStamp - a.timeStamp);
    console.log("getUserLatestMessages: sortedMessages", sortedMessages);
    return sortedMessages;
  } catch (error) {
    console.error("getUserLatestMessages: error", error);
    throw error;
  }
}


export const apiInit = () => {
  return new Promise((resolve, reject) => {
    // Initialize Firebase
    app = initializeApp(firebaseConfig); // if errors reject calls automaticly

    // Initialize Firebase Authentication and get a reference to the service
    auth = getAuth(app);

    database = getDatabase(app);

    resolve("api init ok");
  });
};
