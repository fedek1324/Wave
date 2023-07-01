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
      <StatusBar // не элемент а просто найстройка
        barStyle="light-content"
        backgroundColor={colors.blue}
      />
      <SafeAreaView>
        <View style={styles.content}>
          {error && <Text>{error}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Введите почту"
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Введите пароль"
            onChangeText={setPassword}
            secureTextEntry
          />
          <BoldButton
            style={styles.button}
            onPress={() => {
              signInWithEmail(email, password)
                .then((user) => {
                  console.log("signed in");
                  getCurrentUserChannelsKeys().then(channelKeys => console.log(channelKeys))
                      .catch(err => {
                        if( err.name === "NoUserData") {
                            console.log("Creating new user channels data")
                          initUserChannelsList().then(
                              isSucceeded => {
                                if (isSucceeded) {
                                  navigation.reset({
                                    index: 0,
                                    routes: [{ name: "Messages" }],
                                  });
                                } else {
                                  throw new Error("Tried to init empty user data but failed")
                                }
                              }
                          )
                        } else {
                            throw err;
                        }
                        console.log(err)
                      })

                })
                .catch((err) => {
                  console.log(err);
                  setError(err);
                });
            }}
            text="Войти"
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
