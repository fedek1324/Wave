import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, Switch, View } from "react-native"; // Импорт по именам
import colors from "../constants/colors";
import fonts from "../constants/fonts";

import { RowItem } from "./RowItem";

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ({ text, state, changeState }) => {

  const toggleState = () => {
    changeState(!state)
  }

  return (
    <View style={styles.switchContainer}>
      <RowItem title={text} onPress={toggleState} />
      <Switch
        trackColor={{
          false: colors.fillLightSecondary,
          true: colors.systemGreenLight,
        }}
        thumbColor={colors.white}
        ios_backgroundColor={colors.iosBackgroundColor}
        onValueChange={toggleState}
        value={state}
      />
    </View>
  );
};
