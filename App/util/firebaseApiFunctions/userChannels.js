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
import {getDatabaseInstance} from "./firebase";
import {getChannelKeysFromNames} from "./channelsUtils";

function setChannelsToUser(userId, channelKeys) {
  const database = getDatabaseInstance();
  return new Promise((resolve, reject) => {
    const channelsObj = {};
    channelKeys.forEach((channelKey) => {
      channelsObj[channelKey] = true;
    });
    set(ref(database, `users/${userId}/channels`), channelsObj).then(() =>
      resolve("channels were set")
    );
  });
}

function setUserToChannels(userId, channelKeys) {
  const database = getDatabaseInstance();
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

export function setUserChannels(userId, channelsNames) {
  const database = getDatabaseInstance();
  return new Promise((resolve, reject) => {
    getChannelKeysFromNames(channelsNames).then((channelKeys) => {
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