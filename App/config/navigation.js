import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import Home from "../screens/Home"


const MainStack = createStackNavigator();
const MainStackScreen = () => (
  // headerMode="none"
  // initialRouteName="Options"
  <MainStack.Navigator>
    <MainStack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    {/* <MainStack.Screen name="Options" component={Options} /> */}
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
