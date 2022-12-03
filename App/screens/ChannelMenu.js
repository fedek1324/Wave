import React, { useState } from "react";
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
  getChannelById,
  isUserAdmin,
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

export default ({ navigation, route }) => {
  const params = route.params || {};
  console.log("ChannelMenu params", params);

  const [channel, setChannel] = useState(undefined);
  const [isUserAdminVar, setIsUserAdminVar] = useState(undefined);
  if (!channel) {
    getChannelById(params.channelKey).then((channelResult) => {
      setChannel(channelResult);
    });
  }
  if (isUserAdminVar === undefined) {
    isUserAdmin().then((res) => {
      setIsUserAdminVar(res);
    });
  }

  const adminButtons = [
    <RegularButton
      key={0}
      onPress={() => {
        console.log(
          "Creating button send message. Got channel key:",
          params.channelKey
        );
        navigation.push("SendMessage", {
          title: `Отправить в ${channel.name}`,
          channelKey: params.channelKey,
        });
      }}
      text="Отправить сообщение"
      style={styles.channelButton}
    />,
    <RegularButton
      key={1}
      onPress={() => {}}
      text="Удалить канал"
      style={styles.channelButton}
    />,
  ];

  return (
    <View style={styles.container}>
      <StatusBar // не элемент а просто найстройка
        barStyle="light-content"
        backgroundColor={colors.blue}
      />
      <SafeAreaView>
        {channel ? (
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
            <View style={styles.buttons}>
              {isUserAdminVar &&
                adminButtons.map((button) => {
                  return button;
                })}
              <RegularButton
                key={2}
                onPress={() => {}}
                text="Звуковые уведомления"
                style={styles.channelButton}
              />
              <RegularButton
                key={3}
                onPress={() => {}}
                text="Покинуть канал"
                style={styles.channelButton}
              />
            </View>
          </View>
        ) : (
          <Text>Loading</Text>
        )}
      </SafeAreaView>
    </View>
  );
};
