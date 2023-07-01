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

export function getChannelNameFromKey(channelKey) {
  const database = getDatabaseInstance();

  return new Promise((resolve, reject) => {
    get(query(ref(database, `/channels/${channelKey}/name`)))
      .then((snapshot) => resolve(snapshot.val()))
      .catch((err) => reject(err));
  });
}

export function getChannelKeyFromName(channelName) {
  const database = getDatabaseInstance();

  return new Promise((resolve, reject) => {
    get(
      query(
        ref(database, "/channels"),
        orderByChild("name"),
        equalTo(channelName)
      )
    )
      .then((channel) => resolve(channel.node.children.root_.key))
      .catch((err) => reject(err));
  });
}

export function getChannelKeysFromNames(channelsArray) {
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
