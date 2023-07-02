import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
} from "react-native"; // Импорт по именам

import colors from "../constants/colors";
import fonts from "../constants/fonts";

import Squares from "../assets/icons/squares";
import Bell from "../assets/icons/bell";
import Sliders from "../assets/icons/sliders";

const screen = Dimensions.get("window");

// TODO wrap icons to Views
// TODO style navigation title

const styles = StyleSheet.create({
  bottomNavBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 49,
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // flex: 1,
    // width: screen.width,
    backgroundColor: colors.navBarBackground,
    paddingVertical: 4,
    // ...commonStyles.wrapperMobile
  },
  navBarItemContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  navBarItemTitle: {},
});

export const BottomNavBar = ({ navigation, style = {} }) => (
  <View style={[styles.bottomNavBarContainer, style]}>
    <NavBarItem
      icon={<Squares />}
      title="Каналы"
      onPressFunction={() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Channels" }],
        });
      }}
    />
    <NavBarItem
      icon={<Bell />}
      title="Объявления"
      onPressFunction={() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Messages" }],
        });
      }}
    />
    <NavBarItem
      icon={<Sliders />}
      title="Настройки"
      onPressFunction={() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Settings" }],
        });
      }}
    />
  </View>
);

const NavBarItem = ({ icon, title, onPressFunction }) => (
  <TouchableOpacity
    style={styles.navBarItemContainer}
    onPress={onPressFunction}
  >
    {icon}
    <Text style={styles.navBarItemTitle}>{title}</Text>
  </TouchableOpacity>
);
