import React from "react";
import { View, StyleSheet, StatusBar, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../constants/colors";
import paddings from "../constants/paddings";
import { BoldButton, RegularButton } from "../components/Buttons";

import Lock from "../assets/icons/lock";
import PaperPlane from "../assets/icons/paperPlane";
import fonts from "../constants/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
  },
  illustrationContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 40,
  },
  welcomeText: {
    ...fonts.largeTitle,
    paddingHorizontal: paddings.bigHorizontalPadding,
  },
  buttonsContainer: {
    marginTop: 25,
    paddingHorizontal: paddings.bigHorizontalPadding,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  illustration: {
    width: 277*1,
    height: 267*1, 
    
  },
});

export default ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar // не элемент а просто найстройка
        barStyle="light-content"
        backgroundColor={colors.blue}
      />
      <SafeAreaView>
        <View style={styles.illustrationContainer}>
          <Image
            style={styles.illustration}
            resizeMode="contain"
            source={require("../assets/images/IllustrationSe.png")}
          />
        </View>
        <View>
          <Text style={styles.welcomeText}>
            Wave - это докска объявлений
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <BoldButton
            icon={<PaperPlane fill={colors.white} />}
            onPress={() => {
              navigation.push("Quiz");
            }}
            text="Начать"
          />
          <RegularButton
            icon={<Lock fill={colors.defaultSystemBlueLight} />}
            onPress={() => {
              navigation.push("Login");
            }}
            text="Есть пароль"
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
