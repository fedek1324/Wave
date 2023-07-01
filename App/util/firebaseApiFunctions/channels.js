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

import { getDatabaseInstance } from "./firebase";

export function getAllChannelsExcept(channelsToExcludeKeys) {
  const database = getDatabaseInstance();
  return new Promise((resolve, reject) => {
    get(query(ref(database, "/channels")))
      .then((snapshot) => {
        const channelsObj = snapshot.val();
        const filteredChannelsObj = Object.fromEntries(
          Object.entries(channelsObj).filter(
            ([key, value]) => !channelsToExcludeKeys.includes(key)
          )
        );
        const channelsArray = Object.entries(filteredChannelsObj).map(
          (channelKeyValueObject) => {
            return {
              key: channelKeyValueObject[0],
              ...channelKeyValueObject[1],
            };
          }
        );
        const sortedChannelsArray = channelsArray.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        resolve(sortedChannelsArray);
      })
      .catch((err) => reject(err));
  });
}

export function isChannelExists(name) {
  const database = getDatabaseInstance();
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
  const database = getDatabaseInstance();
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

export const getChannelByKey = (channelId) => {
  const dbRef = ref(getDatabaseInstance());
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
