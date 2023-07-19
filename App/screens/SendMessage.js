import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Text,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../constants/colors";
import paddings from "../constants/paddings";
import { BoldButton, RegularButton } from "../components/Buttons";

import Lock from "../assets/icons/lock";
import PaperPlane from "../assets/icons/paperPlane";
import fonts from "../constants/fonts";
import { createMessage } from "../util/api";

// TODO move multiline textinput to new component

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "flex-start",
    paddingHorizontal: paddings.mainHorizontalpadding,
  },
  button: {
    marginTop: 32,
  },
  input: {
    borderBottomColor: colors.separatorLightNoTransparency,
    borderBottomWidth: 1,
    ...fonts.regularBody,
    marginBottom: 15,
  },
});

export default ({ navigation, route }) => {
  const params = route.params || {};
  const [messageText, setMessageText] = useState(undefined);
  const [messageTitle, setMessageTitle] = useState(undefined);

  return (
    <View style={styles.container}>
      <StatusBar // not element just setup
        barStyle="light-content"
        backgroundColor={colors.blue}
      />
      <SafeAreaView>
        <TextInput
          style={styles.input}
          placeholder="Enter message title"
          onChangeText={setMessageTitle}
        />
        <View
          style={{
            borderColor: colors.separatorLightNoTransparency,
            borderWidth: 1,
            borderRadius: 13,
          }}
        >
          <TextInput
            maxLength={400}
            multiline
            numberOfLines={4}
            onChangeText={(text) => setMessageText(text)}
            style={{ padding: 10 }}
            placeholder="Enter message"
          />
        </View>
        <BoldButton
          style={styles.button}
          onPress={() => {
            createMessage(params.channelKey, messageText, messageTitle).then((res) => {
              console.log("createMessage result:", res);
              navigation.reset({
                index: 0,
                routes: [{ name: "Loading" }],
              });
            });
          }}
          text="Send"
        />
      </SafeAreaView>
    </View>
  );
};
