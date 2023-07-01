import React from "react";
import { Text, View, StyleSheet, Image } from "react-native"; // Импорт по именам

import colors from "../constants/colors";
import fonts from "../constants/fonts";

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginRight: 10,
  },
  messageContainer: {
    flexDirection: "column",
    padding: 10,
    backgroundColor: colors.systemGray06Light,
    borderRadius: 16,
    minWidth: 240,
  },
  metaInfo: {
    flexDirection: "row",
    marginBottom: 10,
    flex: 1,
  },
  metaInfoText: {
    flexDirection: "column",
    flex: 1,
  },
  messageInfo: {
    flexDirection: "column",
  },
  channelName: {
    ...fonts.regularCallout,
  },
  dateTime: {
    ...fonts.regularFootnote,
    color: colors.systemGrayLight,
  },
  title: {
    ...fonts.regularSubheadline,
    marginBottom: 5,
  },
  text: {
    ...fonts.regularFootnote,
  },
});

function formatDate(date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  return `${hours}:${minutes} ${month}.${day}.${year}`;
}

export const Message = ({
  imageUri = "https://i.ibb.co/1LgrM8Y/gradient.jpg",
  channelName,
  dateTime,
  title,
  text,
  style = {},
}) => (
  <View style={[styles.messageContainer, style]}>
    <View style={styles.metaInfo}>
      <Image style={styles.image} source={{ uri: imageUri }} />
      <View style={styles.metaInfoText}>
        <Text style={styles.channelName}>{channelName}</Text>
        <Text style={styles.dateTime}>{formatDate(new Date(dateTime))}</Text>
      </View>
    </View>
    <View style={styles.messageInfo}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  </View>
);
