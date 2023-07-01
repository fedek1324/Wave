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
import {getChannelByKey} from "./channels";

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
      .then(channel => {
        console.log(`Getting channel key. Channel name ${channelName}. See channel below`);
        console.log(channel);
        resolve(channel._node.children_.root_.key);
      })
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


export function getChannelsArrayFromKeys(channelKeys) {
  const database = getDatabaseInstance();
  const dbRef = ref(database);
  return new Promise((resolve, reject) => {
    const getChannelPromises = [
      ...channelKeys.map((channelId) => getChannelByKey(channelId)),
    ];
    Promise.all(getChannelPromises)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
  });
}