import React, { useState, useEffect } from "react";
import { View, StyleSheet, Keyboard, Dimensions, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    bottom: 0,
  },
});

export const KeyboardSpacer = ({ style, onToggle = () => null }) => {
  const [keyboardSpace, setKeyboardSpace] = useState(0);

  useEffect(() => {
    // useEffect выполняется при рендеринге страницы и выполняет функцию в return после выхода с экрана
    const updateKeyboardSpace = (event) => {
      if (!event.endCoordinates) {
        return;
      }
      const screenHeight = Dimensions.get("screen").height;
      let newKeyboardSpace = screenHeight - event.endCoordinates.screenY;
      if (Platform.OS === "android") { // если андроид то место под клаву увеличивать не нужно 
        newKeyboardSpace = 0; // и вообще можно всегда держать скролл вью включенным
      }
      setKeyboardSpace(newKeyboardSpace);
      onToggle(true, newKeyboardSpace);
      console.log(newKeyboardSpace);
    };
    const showEvt =
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow";
    const showListener = Keyboard.addListener(showEvt, updateKeyboardSpace);

    const resetKeyboardSpace = () => {
      console.log(0);
      setKeyboardSpace(0);
      onToggle(false, 0);
    };
    const hideEvt =
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide";
    const hideListener = Keyboard.addListener(hideEvt, resetKeyboardSpace);

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []); // [] - это зависимости, задают когда активироваться помимо рендера

  return <View style={[styles.container, { height: keyboardSpace }, style]} />;
};
