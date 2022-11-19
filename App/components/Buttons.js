import React from "react";
import {Text, TouchableOpacity, StyleSheet } from "react-native"; // Импорт по именам

import colors from "../constants/colors"
import fonts from "../constants/fonts"


const styles = StyleSheet.create({
    button: {
      paddingVertical: 13,
      borderRadius: 10,
      height: 48,
      flexDirection: "row",
      textAlign: "center",
      justifyContent: "center"
    },

    boldButton: {
      backgroundColor: colors.defaultSystemBlueLight,
      paddingHorizontal: 20,
    },
    regularButton: {
      backgroundColor: colors.lightBlue,
      paddingHorizontal: 8,
    },

    boldButtonText: {
      color: colors.white,
      ...fonts.boldBody
    },
    regularButtonText: {
      color: colors.defaultSystemBlueLight,
      ...fonts.regularButton
    },

    marginR: {
      marginLeft: 10,
    }

})


export const BoldButton = ({ icon = null, onPress, text }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, styles.boldButton]}>
    {icon}
    <Text style={icon ? [styles.boldButtonText, styles.marginR] : styles.boldButtonText}>{text}</Text>
  </TouchableOpacity>
)

export const RegularButton = ({ icon = null, onPress, text }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, styles.regularButton]}>
    {icon}
    <Text style={styles.regularButtonText}>{text}</Text>
  </TouchableOpacity>
)


