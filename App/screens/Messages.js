import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Text,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../constants/colors";
import paddings from "../constants/paddings";
import { BoldButton, RegularButton } from "../components/Buttons";

import Lock from "../assets/icons/lock";
import PaperPlane from "../assets/icons/paperPlane";
import { Message } from "../components/Message";

import { getUserLatestMessages } from "../util/api";
import { BottomNavBar } from "../components/BottomNavBar";

// TODO padding bottom to scrollView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "flex-start",
    paddingHorizontal: paddings.mainHorizontalpadding,
  },
  messagesContainer: {
    marginTop: 27,
  },
  message: {
    marginBottom: 25,
  },
});

export default ({ navigation }) => {
  // createMessage("-NHVW9RRG7Vvk66kp7lK", new Date().toTimeString(), "Hello").then(res => console.log(res))

  let messageElements = [];
  const [messages, setMessages] = useState(undefined);

  if (!messages) {
    getUserLatestMessages().then((messagesRes) => {
      messageElements = messagesRes.map((message) => {
        return (
          <Message
            key={message.timeStamp}
            channelName={message.channelName}
            dateTime={message.timeStamp}
            text={message.text}
            title={message.title}
            style={styles.message}
          />
        );
      });
      setMessages(messageElements);
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar // не элемент а просто найстройка
        barStyle="light-content"
        backgroundColor={colors.blue}
      />
      <SafeAreaView>
        <View style={styles.messagesContainer}>
          <ScrollView>{messages || <Text>Loading</Text>}</ScrollView>
        </View>
      </SafeAreaView>
      <BottomNavBar navigation={navigation} />
    </View>
  );
};
