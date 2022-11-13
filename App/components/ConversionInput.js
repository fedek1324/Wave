import React from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import colors from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.white,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  containerDisabled: {
    backgroundColor: colors.offWhite,
  },
  button: {
    padding: 15,
    borderRightColor: colors.border,
    borderRightWidth: 1,
    backgroundColor: colors.white, // задали цвет кнопки тут чтобы при изменении фона при editable false цвет оставался белым
    borderTopLeftRadius: 5, // не обязательно тк есть borderRadius у контейнера но bgColor: colors.white почему то сбрасывает эти скругления
    borderBottomLeftRadius: 5,// не обязательно тк есть borderRadius у контейнера но bgColor: colors.white почему то сбрасывает эти скругления
  },
  buttonText: {
    fontSize: 18,
    color: colors.blue,
    fontWeight: "bold",
  },
  input: {
    flex: 1, // по умолчанию инпут занимает минимальную ширину
    padding: 10,
    fontSize: 16,
    color: colors.textLight,
  },
});


export const ConversionInput = ({ text, onButtonPress, ...textInputProps }) => {
  const containerStyles = [styles.container]

  if (textInputProps.editable === false) {
    containerStyles.push(styles.containerDisabled)
  }
  
  return (
    <View style={containerStyles}>
      <TouchableOpacity onPress={onButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
      <TextInput style={styles.input} {...textInputProps} />
    </View>
  );
};
