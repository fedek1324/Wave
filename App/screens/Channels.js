import React, {useEffect, useState} from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Text,
  Dimensions,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../constants/colors";
import paddings from "../constants/paddings";
import { BoldButton, RegularButton } from "../components/Buttons";

import Lock from "../assets/icons/lock";
import PaperPlane from "../assets/icons/paperPlane";
import fonts from "../constants/fonts";
import { Channel } from "../components/Channel";

import {
  getCurrentUser,
  getUserChannels,
  createMessage,
  getChannelMessages,
  getUserLatestMessages,
  getAllChannelsExcept,
  isChannelExists
} from "../util/api";
import { BottomNavBar } from "../components/BottomNavBar";
import { ChannelGroup } from "../components/ChannelGroup";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "flex-start",
    padding: paddings.mainHorizontalpadding,
  },
  channels: {
    marginTop: 23,
    marginBottom: 49,
  },
  channel: {
    marginBottom: 12,
  },
});

export default ({ navigation }) => {
  const [userChannels, setUserChannels] = useState(undefined);
  const [otherChannels, setOtherChannels] = useState(undefined);
  const [error, setError] = useState(undefined);

  const {height, width, scale, fontScale} = useWindowDimensions();


  function mapChannelsToElements(channels) {
    return channels.map((channel) => (
      <Channel
        key={channel.name}
        style={styles.channel}
        imageUri={channel.umageUrl}
        title={channel.name}
        description={channel.description}
        onPress={() => {
          navigation.push("ChannelMenu", {
            title: `Меню канала ${channel.name}`,
            channelKey: channel.key,
          });
        }}
      />
    ));
  }

  async function loadUserChannels() {
    try {
      const user = await getCurrentUser();
      const channelsRes = await getUserChannels(user.uid);
      console.log("got channels", channelsRes);

      const userChannelsElements = mapChannelsToElements(channelsRes);
      setUserChannels(userChannelsElements);

      const userChannelKeys = channelsRes.map((channelObj) => channelObj.key);
      console.log("userChannelKeys", userChannelKeys);

      const otherChannelsRes = await getAllChannelsExcept(userChannelKeys);
      const otherChannelsElements = mapChannelsToElements(otherChannelsRes);
      console.log(otherChannelsElements);
      setOtherChannels(otherChannelsElements);
    } catch (err) {
      console.log("ERROR getUserChannels", err);
      setError(err);
    }
  }

  if (!userChannels) {
    loadUserChannels();
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.blue}
        />
        <SafeAreaView>
          <ScrollView contentContainerStyle={{height: height - 150}}>
            <View style={styles.channels}>
              {error && <Text>{error.toString()}</Text>}
              {userChannels ? (
                <ChannelGroup channels={userChannels} groupName="Мои каналы" />
              ) : (
                <Text>Loading</Text>
              )}
              {otherChannels ? (
                <ChannelGroup channels={otherChannels} groupName="Другие каналы" />
              ) : (
                <Text>Loading</Text>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
      <BottomNavBar navigation={navigation} />
    </>
  );
};
