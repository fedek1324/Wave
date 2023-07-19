import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RegularButton } from "../components/Buttons";
import colors from "../constants/colors";
import fonts from "../constants/fonts";
import paddings from "../constants/paddings";

import {
  apiInit,
  getCurrentUser,
  getChannelByKey,
  isUserAdmin,
  getCurrentUserChannelsKeys,
  getUserChannels,
  setUserChannels
} from "../util/api";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "flex-start",
    paddingHorizontal: paddings.mainHorizontalpadding,
  },
  content: {
    marginTop: 29,
  },
  channelHat: {
    flexDirection: "column",
    paddingVertical: 10,
    marginBottom: 17,
  },
  channelImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    marginBottom: 10,
  },
  channelName: {
    ...fonts.regularTitle1,
  },
  channelDescription: {
    ...fonts.regularFootnote,
  },
  channelButton: {
    marginBottom: 6,
  },
});

const SendMessageButton = ({ navigation, channel }) => (
  <RegularButton
    onPress={() => {
      console.log("Creating button send message. Got channel key:", channel.key);
      navigation.push("SendMessage", {
        title: `Send to ${channel.name}`,
        channelKey : channel.key,
      });
    }}
    text="Send message"
    style={styles.channelButton}
  />
);

const LeftChannelButton = ({ navigation, channel }) => (
  <RegularButton
    onPress={async () => {
        let channelKeys = await getCurrentUserChannelsKeys();
        console.log(channel.key);
        channelKeys = channelKeys.filter(channelKey => channelKey !== channel.key);
        const currentUser = await getCurrentUser();
        const setOperationRes = await setUserChannels({userId: currentUser.id, channelKeys});
        console.log(`Set channels = ${setOperationRes}`);

        navigation.reset({
            index: 0,
            routes: [{ name: "Channels" }],
        });
    }}
    text="Leave channel"
    style={styles.channelButton}
  />
);

const EnterChannelButton = ({ navigation, channel }) => (
  <RegularButton
    onPress={async () => {
       const channelKeys = await getCurrentUserChannelsKeys();
       channelKeys.push(channel.key);
       const currentUser = await getCurrentUser();
       const setOperationRes = await setUserChannels({userId: currentUser.id, channelKeys});
       console.log(`Set channels = ${setOperationRes}`);
        navigation.reset({
            index: 0,
            routes: [{ name: "Channels" }],
        });
    }}
    text="Enter channel"
    style={styles.channelButton}
  />
);

const DeleteChannelButton = ({ navigation, channel }) => (
  <RegularButton
    onPress={async () => { }}
    text="Delete channel"
    style={styles.channelButton}
  />
);

const SoundNotificationsButton = ({ navigation, channel }) => (
  <RegularButton
    onPress={() => {}}
    text="Sound notifications"
    style={styles.channelButton}
  />
);

const Buttons = ({ navigation, channel }) => {
  const [isUserAdminVar, setIsUserAdminVar] = useState(undefined);
  const [isUserInChanel, setIsUserInChanel] = useState(undefined);

  useEffect(() => {
    isUserAdmin().then((res) => {
      setIsUserAdminVar(res);
    });
    getCurrentUserChannelsKeys().then((userChannels) => {
      setIsUserInChanel(userChannels.includes(channel.key));
    });
  }, [channel]);

  const adminButtons = [
    <SendMessageButton
      key={0}
      channel={channel}
      navigation={navigation}
    />,
    // <DeleteChannelButton
    //   key={1}
    //   channel={channel}
    //   navigation={navigation}
    // />,
  ];

  return (
    <View style={styles.buttons}>
      {isUserInChanel === undefined ? (
        <Text>Loading</Text>
      ) : (
        <>
          {isUserAdminVar &&
            adminButtons}
          {isUserInChanel ? (
            <LeftChannelButton
              key={2}
              channel={channel}
              channelKey={channel.key}
              navigation={navigation}
            />
          ) : (
            <EnterChannelButton
              key={2}
              channel={channel}
              navigation={navigation}
            />
          )}
          {/* <SoundNotificationsButton */}
          {/*   key={3} */}
          {/*   channel={channel} */}
          {/*   navigation={navigation} */}
          {/* /> */}
        </>
      )}
    </View>
  );
};

export default ({ navigation, route }) => {
  const { channelKey } = route.params || {};
  console.log("ChannelMenu params", route.params);

  const [channel, setChannel] = useState(undefined);

  useEffect(() => {
    getChannelByKey(channelKey).then((channelResult) => {
      setChannel(channelResult);
    });
  }, [channelKey]);

  return (
    <View style={styles.container}>
      <StatusBar // not element just setting
        barStyle="light-content"
        backgroundColor={colors.blue}
      />
      <SafeAreaView>
        {channel ? (
          <>
            <View style={styles.content}>
              <View style={styles.channelHat}>
                <Image
                  source={{ uri: channel.imageUrl }}
                  style={styles.channelImage}
                />
                <Text style={styles.channelName}>{channel.name}</Text>
                <Text style={styles.channelDescription}>
                  {channel.description}
                </Text>
              </View>
            </View>
            <Buttons navigation={navigation} channel={channel} />
          </>
        ) : (
          <Text>Loading</Text>
        )}
      </SafeAreaView>
    </View>
  );
};
