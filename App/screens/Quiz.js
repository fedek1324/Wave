import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Switch, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RowItem } from "../components/RowItem";

import colors from "../constants/colors";

import Chevron from "../assets/icons/chevron";
import MySwitch from "../components/MySwitch";
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "flex-start",
  },
  content: {},
});

export default ({ navigation }) => {
  const [liveInDormitory, setLiveInDormitory] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar // не элемент а просто найстройка
        barStyle="light-content"
        backgroundColor={colors.blue}
      />
      <SafeAreaView>
        <View style={styles.content}>
          <RowItem
            title="Институт"
            onPress={() => console.log("institute")}
            rightIcon={<Chevron fill={colors.tertiary} />}
          />
          <RowItem
            title="Курс"
            onPress={() => console.log("курс")}
            rightIcon={<Chevron fill={colors.tertiary} />}
          />
          <MySwitch text="Живу в общежитии" state={liveInDormitory} changeState={setLiveInDormitory} />
        </View>
      </SafeAreaView>
    </View>
  );
};
