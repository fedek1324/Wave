import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity } from "react-native";

import Loading from "../screens/Loading";
import Welcome from "../screens/Welcome";
import Quiz from "../screens/Quiz";

import HeaderButton from "../components/HeaderButton";

const MainStack = createStackNavigator();
const MainStackScreen = () => (
  // headerMode="none"
  <MainStack.Navigator initialRouteName="Quiz">
    <MainStack.Screen
      name="Loading"
      component={Loading}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="Welcome"
      component={Welcome}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="Quiz"
      component={Quiz}
      options={{
        headerShown: true,
        title: "Небольшая анкета",
        headerRight: () => (
          <HeaderButton text="Пропустить" onPress={() => console.log("Skip")} />
        ),
      }}
    />
  </MainStack.Navigator>
);

const ModalStack = createStackNavigator();
const ModalStackScreen = () => (
  <ModalStack.Navigator screenOptions={{ presentation: "modal" }}>
    <ModalStack.Screen
      name="Main"
      component={MainStackScreen}
      options={{ headerShown: false }}
    />
  </ModalStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <ModalStackScreen />
  </NavigationContainer>
);
