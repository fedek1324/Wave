import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Text,
  Dimensions,
  ScrollView,
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
  gellAllChannelsExcept,
} from "../util/api";
import { BottomNavBar } from "../components/BottomNavBar";
import { ChannelGroup } from "../components/ChannelGroup";

const screen = Dimensions.get("window");

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

// TODO optimize

export default ({ navigation }) => {
  const [userChannels, setUserChannels] = useState(undefined);
  const [oherChannels, setOtherChannels] = useState(undefined);
  const [error, setError] = useState(undefined);

  if (!userChannels)
    getCurrentUser().then((user) => {
      getUserChannels(user.uid)
        .then((channelsRes) => {
          console.log("got channels", channelsRes);
          let userChannelsElements = [];
          userChannelsElements = channelsRes.map((channel) => {
            return (
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
            );
          });
          setUserChannels(userChannelsElements);
          const userChannelKeys = channelsRes.map(channelObj => {
            return channelObj.key
          })
          console.log("userChannelKeys", userChannelKeys)
          gellAllChannelsExcept(userChannelKeys).then((otherChannelsRes) => {
            let otherChannelsElements = [];
            otherChannelsElements = otherChannelsRes.map((channel) => {
              return (
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
              );
            });
            console.log(otherChannelsElements);
            setOtherChannels(otherChannelsElements)
          });
        })
        .catch((err) => {
          console.log("ERROR getUserChannels", err);
          setError(err);
        });
    });

  return (
    <View style={styles.container}>
      <StatusBar // не элемент а просто найстройка
        barStyle="light-content"
        backgroundColor={colors.blue}
      />
      <SafeAreaView>
        <ScrollView>
          <View style={styles.channels}>
            {error && <Text>{error.toString()}</Text>}
            {userChannels ? (
              <ChannelGroup channels={userChannels} groupName="Мои каналы" />
            ) : (
              <Text>Loading</Text>
            )}
            {oherChannels ? (
              <ChannelGroup channels={oherChannels} groupName="Другие каналы" />
            ) : (
              <Text>Loading</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomNavBar navigation={navigation} />
    </View>
  );
};
