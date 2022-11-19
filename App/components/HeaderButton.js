import React from "react";
import {Text, TouchableOpacity, StyleSheet} from "react-native"; // Импорт по именам
import colors from "../constants/colors"
import fonts from "../constants/fonts"

const styles = StyleSheet.create({
    navButton: {
        alignItems: "center",
        alignContent: "center",
        paddingRight: 8,
        paddingLeft: 6.5,
        paddingVertical: 10
    },
    headerButtontext: {
      color: colors.defaultSystemBlueLight,
      ...fonts.regularBody
    }
})


export default ({ text, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.navButton}>
    <Text style={styles.headerButtontext}>{text}</Text>
  </TouchableOpacity>
)

