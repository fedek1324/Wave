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
import colors from "../constants/colors";

import { apiInit, getCurrentUser } from "../util/api";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    paddingBottom: screen.height * 0.1,
  },
  logo: {
    height: 88,
  },
});

export default ({ navigation }) => {
  const [error, setError] = useState(undefined);
  if (!error) {
    apiInit()
      .then((res) => {
        console.log("result", res);
        getCurrentUser().then((user) => {
          if (user) {
            navigation.reset({
              index: 0,
              routes: [{ name: "Messages" }],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: "Welcome" }],
            });
          }
        });
      })
      .catch((err) => {
        console.log("error", err);
        setError(`${err}`);
      });
  }

  return (
    <View style={styles.container}>
      <StatusBar // не элемент а просто найстройка
        barStyle="light-content"
        backgroundColor={colors.blue}
      />
      <SafeAreaView>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/images/logo.png")} // автоматически подбирает 1х 2х или 3х
            resizeMode="contain" // рассчитать так чтобы вся иконка поместилась и не обрезлать одним из измерений шириной или высотой
          />
          {error && <Text>{error}</Text>}
        </View>
      </SafeAreaView>
    </View>
  );
};
