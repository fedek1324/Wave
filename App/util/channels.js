import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import { getDatabaseInstance } from "./firebase";

const wdwaa = 0;

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
