import React from "react";
import { View, StyleSheet, StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RowItem } from "../components/RowItem";
import colors from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "flex-start",
  },
});

export default ({ navigation, route }) => {
  const params = route.params || {};
  const {options, setState} = params

  return (
    <View style={styles.container}>
      <StatusBar // не элемент а просто найстройка
        barStyle="light-content"
        backgroundColor={colors.blue}
      />
      <SafeAreaView>
        {options.map((optionName) => {
          return <RowItem key={optionName} title={optionName} onPress={() => {setState(optionName); navigation.pop()}} />;
        })}
      </SafeAreaView>
    </View>
  );
};
