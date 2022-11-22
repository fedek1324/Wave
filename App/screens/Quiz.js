import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  YellowBox
} from "react-native";



import { SafeAreaView } from "react-native-safe-area-context";
import { RowItem } from "../components/RowItem";

import colors from "../constants/colors";

import Chevron from "../assets/icons/chevron";
import MySwitch from "../components/MySwitch";
import { BoldButton } from "../components/Buttons";
import paddings from "../constants/paddings";



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "flex-start",
  },
  content: {},
  buttonContainer: {
    flexDirection: "row", // otherwise button resizes
    paddingHorizontal: paddings.mainHorizontalpadding,
    paddingTop: 16,
  }
});

// TODO check
// https://stackoverflow.com/questions/66310505/non-serializable-values-were-found-in-the-navigation-state-when-passing-a-functi
// And make Selection to pass result through params
YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);


export default ({ navigation }) => {
  const [institute, setInstitute] = useState(undefined);
  const institutes = [
    "ИРИТ",
    "ИТС",
    "ИПТМ",
    "ИЯиЭТФ",
    "ИНЭЛ",
    "ИФХТиМ",
    "ИНЭУ",
    "Другое",
  ];

  const [liveInDormitory, setLiveInDormitory] = useState(false);

  const [course, setCourse] = useState(undefined);
  const courses = ["1", "2", "3", "4", "5", "6", "Другое"];

  const [dormitoryNumber, setDormitoryNumber] = useState(undefined);
  const dormitoryNumbers = ["1", "2", "3", "4", "5", "6"];

  const [interestedInStudentActivity, setInterestedInStudentActivity] =
    useState(false);

  const [studentOrganization, setstudentOrganization] = useState(undefined);
  const studentOrganizations = [
    "Профсоюзная организация",
    "Студенческий совет",
    "РСМ",
    "Отряды",
    "Другое",
  ];

  const createSelection = (props) => {
    return (
      <RowItem
        title={props.subject}
        onPress={() => {
          navigation.push("Selection", {
            title: props.subject,
            options: props.options,
            setState: props.setState,
          });
        }}
        rightIcon={<Chevron fill={colors.tertiary} />}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar // не элемент а просто найстройка
        barStyle="light-content"
        backgroundColor={colors.blue}
      />
      <SafeAreaView>
        <View style={styles.content}>
          {createSelection({
            subject: "Институт",
            options: institutes,
            setState: setInstitute,
          })}
          {createSelection({
            subject: "Курс",
            options: courses,
            setState: setCourse,
          })}
          <MySwitch
            text="Живу в общежитии"
            state={liveInDormitory}
            changeState={setLiveInDormitory}
          />
          {liveInDormitory &&
            createSelection({
              subject: "Номер общежития",
              options: dormitoryNumbers,
              setState: setDormitoryNumber,
            })}
          <MySwitch
            text="Интересует студенческая жизнь"
            state={interestedInStudentActivity}
            changeState={setInterestedInStudentActivity}
          />
          {interestedInStudentActivity &&
            createSelection({
              subject: "Организация (необязательно)",
              options: studentOrganizations,
              setState: setstudentOrganization,
            })}
          <View style={styles.buttonContainer}>
            <BoldButton text="Готово" />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
