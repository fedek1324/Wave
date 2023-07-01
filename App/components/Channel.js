import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native"; // Импорт по именам

import colors from "../constants/colors";
import fonts from "../constants/fonts";

// TODO fix type shevron
import ChevronRight from "../assets/icons/shevronRight";

const styles = StyleSheet.create({
  image: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    marginRight: 16,
  },
  channelContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.systemGray06Light,
    borderRadius: 13,
    minWidth: 240,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    flex: 1, // fill all possible width before check mark if it exists
  },
  infoContainer: {
    flexDirection: "column",
    flex: 1,
  },
  title: {
    ...fonts.regularCallout,
    marginBottom: 2,
  },
  description: {
    ...fonts.regularFootnote,
  },
  checkMark: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },
});

const checkMark = require("../assets/images/checkMark.png");

export const Channel = ({
  imageUri = "https://i.ibb.co/1LgrM8Y/gradient.jpg",
  title,
  description,
  selected = false,
  style = {},
  onPress = () => {}
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.channelContainer, style]}>
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={{ uri: imageUri }}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      {selected ? (
        <Image
          style={styles.checkMark}
          source={checkMark} // automaticly chooses 1х 2х or 3х
          resizeMode="cover"
        />
      ) : (
        <ChevronRight />
      )}
    </View>
  </TouchableOpacity>
);
