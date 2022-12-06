import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native"; // Импорт по именам

import colors from "../constants/colors";
import fonts from "../constants/fonts";


const styles = StyleSheet.create({
  groupName: {
    color: colors.labelLightSecondary,
    ...fonts.regularCaption1,
    marginLeft: 16,
    marginBottom: 8,
  }
});

export const ChannelGroup = ({
  channels, groupName
}) => (
  <View>
    <Text style={styles.groupName}>{groupName}</Text>
    {channels}
  </View>
);
