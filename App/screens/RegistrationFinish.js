import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Text,
  Dimensions,
  ScrollView, useWindowDimensions,
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

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "flex-start",
    padding: paddings.mainHorizontalpadding,
    // position: "relative",
  },
  congratsContainer: {
    flexDirection: "row",
    paddingTop: screen.height * 0.08,
  },
  largeTitle: {
    ...fonts.largeTitle,
    width: 242,
    paddingTop: 36,
  },
  confetti: {
    height: 72,
    width: 72,
    marginLeft: 20
  },
  message: {
    ...fonts.regularBody,
    marginTop: 20,
    width: 258,
  },
  channels: {
    marginTop: 33,
  },
  channel: {
    marginBottom: 12,
  },
  buttonPosition: {
    position: "absolute",
    right: 21,
    bottom: 66,
    zIndex: 1000,
  },
});


export default ({ navigation }) => {
  let channelsElements = [];
  const [channels, setChannels] = useState(undefined);

  const {height, width, scale, fontScale} = useWindowDimensions();

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
              selected
            />
          );
        });
        setChannels(channelsElements);
      });
    });

  return (
    <>
      <BoldButton
        style={styles.buttonPosition}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Messages" }],
          });
        }}
        text="Next"
      />
      <View style={styles.container}>
        <StatusBar // не элемент а просто найстройка
          barStyle="light-content"
          backgroundColor={colors.blue}
        />
        <SafeAreaView>
          <ScrollView style={{height: height - 60}}>
            <View style={styles.congratsContainer}>
              <Text style={styles.largeTitle}>Congratulations on the setup!</Text>
              <Image
                style={styles.confetti}
                source={require("../assets/images/confetti.png")} // автоматически подбирает 1х 2х или 3х
                resizeMode="contain"
              />
            </View>
            <Text style={styles.message}>
              An initial list of channels has been formed for you. Channels can be
              configured later.
            </Text>
            <View
              style={styles.channels} // TODO Image usage
            >
              {channels || <Text>Loading</Text>}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
};
