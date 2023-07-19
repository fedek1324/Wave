import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../constants/colors";
import { BottomNavBar } from "../components/BottomNavBar";
import { RowItem } from "../components/RowItem";
import paddings from "../constants/paddings";

import { getCurrentUser, logOut } from "../util/api";
import fonts from "../constants/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: paddings.mainHorizontalpadding,
    justifyContent: "flex-start",
  },
  title: {
    ...fonts.regularBody,
  },
});

export default ({ navigation }) => {
  const [username, setUsername] = useState("User: ");
  if (username === "User: ") {
    getCurrentUser().then((user) => {
      setUsername(
        `User: ${user.uid}\n${
          user.email ? `Administrator: ${user.email}` : "Regular user"
        }`
      );
    });
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar // не элемент а просто найстройка
          barStyle="light-content"
          backgroundColor={colors.blue}
        />
        <SafeAreaView>
          <Text style={styles.title}>{username}</Text>
          <RowItem
            title="Logout"
            onPress={() => {
              logOut().then((res) => {
                console.log(res);
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Loading" }],
                });
              });
            }}
            textStyle={{ color: colors.systemRedLight }}
          />
        </SafeAreaView>
      </View>
      <BottomNavBar navigation={navigation} />
    </>
  );
};
