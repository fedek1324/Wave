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

import { getCurrentUser, getUserChannels, createMessage, getChannelMessages, getUserLatestMessages } from "../util/api";
import { BottomNavBar } from "../components/BottomNavBar";

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
  },
  channel: {
    marginBottom: 12,
  },
});


export default ({ navigation }) => {
  let channelsElements = [];
  const [channels, setChannels] = useState(undefined);
  const [error, setError] = useState(undefined)

  if (!channels)
    getCurrentUser().then((user) => {
      getUserChannels(user.uid).then((channelsRes) => {
        console.log("got channels", channelsRes);
        channelsElements = channelsRes.map((channel) => {
          return (
            <Channel
              key={channel.name}
              style={styles.channel}
              imageUri={channel.umageUrl}
              title={channel.name}
              description={channel.description}
            />
          );
        });
        setChannels(channelsElements);
      })
      .catch( err => {
        console.log("ERROR getUserChannels", err)
        setError(err)
      })
    });

  return (
    <View style={styles.container}>
      <StatusBar // не элемент а просто найстройка
        barStyle="light-content"
        backgroundColor={colors.blue}
      />
      <SafeAreaView>
        <ScrollView>
          <View
            style={styles.channels} // TODO Image usage
          >
            {error && <Text>{error.toString()}</Text>}
            {channels || <Text>Loading</Text>}
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomNavBar navigation={navigation} />
    </View>
  );
};
