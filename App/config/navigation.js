import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity } from "react-native";

import Loading from "../screens/Loading";
import Welcome from "../screens/Welcome";
import Quiz from "../screens/Quiz";
import RegistrationFinish from "../screens/RegistrationFinish";

import HeaderButton from "../components/HeaderButton";
import Selection from "../screens/Selection";
import Announcements from "../screens/Messages";
import Channels from "../screens/Channels";
import Settings from "../screens/Settings";
import Login from "../screens/Login";
import ChannelMenu from "../screens/ChannelMenu";
import SendMessage from "../screens/SendMessage";

const MainStack = createStackNavigator();
const MainStackScreen = ({navigation}) => (
  // headerMode="none"
  <MainStack.Navigator initialRouteName="Loading">
    <MainStack.Screen
      name="Loading"
      component={Loading}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="Welcome"
      component={Welcome}
      options={{
        headerShown: false,
        title: "Приветствие",
      }}
    />
    <MainStack.Screen
      name="Quiz"
      component={Quiz}
      options={{
        headerShown: true,
        title: "Анкета",
        // headerRight: () => (
        //   <HeaderButton text="Пропустить" onPress={() => navigation.push("RegistrationFinish")} />
        // ),
      }}
    />
    <MainStack.Screen
      name="RegistrationFinish"
      component={RegistrationFinish}
      options={{
        headerShown: false,
      }}
    />
    <MainStack.Screen
      name="Messages"
      component={Announcements}
      options={{
        headerShown: true,
        title: "Объявления",
      }}
    />
    <MainStack.Screen
      name="Channels"
      component={Channels}
      options={{
        headerShown: true,
        title: "Каналы",
      }}
    />
    <MainStack.Screen
      name="Settings"
      component={Settings}
      options={{
        headerShown: true,
        title: "Настройки",
      }}
    />
    <MainStack.Screen
      name="Login"
      component={Login}
      options={{
        headerShown: true,
        title: "Вход",
      }}
    />
    <MainStack.Screen
      name="ChannelMenu"
      component={ChannelMenu}
      options={({ navigationChannelsMenu, route }) => ({
        // header shown true is default
        title: route.params && route.params.title,
      })}
    />
    <MainStack.Screen
      name="SendMessage"
      component={SendMessage}
      options={({ navigationChannelsMenu, route }) => ({
        title: route.params && route.params.title,
      })}
    />

  </MainStack.Navigator>
);

const ModalStack = createStackNavigator();
const ModalStackScreen = () => (
  <ModalStack.Navigator screenOptions={{ presentation: "modal" }}>
    <ModalStack.Screen
      name="Назад"
      component={MainStackScreen}
      options={{ headerShown: false }}
    />
    <ModalStack.Screen
      name="Selection"
      component={Selection}
      options={({ navigation, route }) => ({
        title: route.params && route.params.title,
      })}
    />
  </ModalStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <ModalStackScreen />
  </NavigationContainer>
);
