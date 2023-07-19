import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Text,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BoldButton, RegularButton } from "../components/Buttons";
import colors from "../constants/colors";
import fonts from "../constants/fonts";
import paddings from "../constants/paddings";

import {apiInit, getCurrentUser, getCurrentUserChannelsKeys, signInWithEmail, initUserChannelsList} from "../util/api";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "flex-start",
    paddingHorizontal: paddings.mainHorizontalpadding,
  },
  input: {
    borderBottomColor: colors.separatorLightNoTransparency,
    borderBottomWidth: 1,
    ...fonts.regularBody,
    marginBottom: 15,
  },
  content: {
    marginTop: 29,
  },
  button: {
    marginTop: 26,
  },
});

export default ({ navigation }) => {
  const [error, setError] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  return (
    <View style={styles.container}>
      <StatusBar // not element just setup
        barStyle="light-content"
        backgroundColor={colors.blue}
      />
      <SafeAreaView>
        <View style={styles.content}>
          {error && <Text>{error}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            onChangeText={setPassword}
            secureTextEntry
          />
          <BoldButton
            style={styles.button}
            onPress={async () => {
                try {
                    const user = await signInWithEmail(email, password);
                    console.log("signed in");
                    const channelKeys = await getCurrentUserChannelsKeys();
                    console.log(channelKeys);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Messages" }],
                    });
                } catch (err) {
                    console.log(err);
                    if (err.name === "NoUserData") {
                        console.log("Creating new user channels data");
                        try {
                            const isSucceeded = await initUserChannelsList();
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "Messages" }],
                            });
                            if (!isSucceeded) {
                                throw new Error("Tried to init empty user data but failed");
                            }
                        } catch (err2) {
                            setError(err2)
                        }
                    } else {
                        setError(err)
                    }
                }
            }}
            text="Login"
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
