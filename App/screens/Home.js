import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import colors from "../constants/colors";

import { api, getUser } from "../util/api"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
    justifyContent: "flex-start",
  },
  header: {
    alignItems: "flex-end",
    marginHorizontal: 20,
  },
});

export default ({ navigation }) => {
  api()
    .then( (res) => {
      console.log("result", res)
    })
    .catch ( err => {
      console.log("error", err)
    })

  return (
    <View style={styles.container}>
      <StatusBar // не элемент а просто найстройка
        barStyle="light-content"
        backgroundColor={colors.blue}
      />
      <SafeAreaView style={styles.header}>
        <TouchableOpacity onPress={() => navigation.push("TODO")}>
          <Entypo name="cog" size={32} color={colors.white} />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};
