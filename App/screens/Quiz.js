import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Text, YellowBox } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { RowItem } from "../components/RowItem";

import colors from "../constants/colors";

import Chevron from "../assets/icons/chevron";
import MySwitch from "../components/MySwitch";
import { BoldButton } from "../components/Buttons";
import paddings from "../constants/paddings";

import {
  signInAnonymouslyMy,
  getCurrentUser,
  setUserChannels,
} from "../util/api";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "flex-start",
    paddingHorizontal: paddings.mainHorizontalpadding,
  },
  content: {},
  buttonContainer: {
    flexDirection: "row", // otherwise button resizes
  },
});

// TODO check
// https://stackoverflow.com/questions/66310505/non-serializable-values-were-found-in-the-navigation-state-when-passing-a-functi
// And make Selection to pass result through params

// Fix creating undefined channel when select studSovet

// !!! If you pass this second time channel in user will be new but channel users will remain
YellowBox.ignoreWarnings([
  "Non-serializable values were found in the navigation state",
]);

const createAnonimousUserWithChannels = (
  institute,
  course,
  liveInDormitory,
  dormitoryNumber,
  interestedInStudentActivity,
  studentOrganization
) => {
  return new Promise((resolve, reject) => {
    signInAnonymouslyMy().then((res) => {
      console.log(res);
      // TODO - Change to channels id. So that we can rename channels and still subscribe here
      const channels = ["НГТУ им Р. Е. Алексеева"];
      if (institute !== "Другое") channels.push(institute);
      if (course !== "Другое") channels.push(`${course} Курс`);
      if (liveInDormitory) channels.push(`${dormitoryNumber} Общежитие`);
      if (interestedInStudentActivity) channels.push("Студенческая жизнь");
      if (
        interestedInStudentActivity &&
        studentOrganization &&
        studentOrganization !== "Другое"
      )
        channels.push(studentOrganization);

      console.log("Pushing channels", channels);
      getCurrentUser()
        .then((user) => {
          // Change this to add channels not to set
          setUserChannels(user.uid, channels)
            .then((res2) => {
              console.log("setUserChannels", res2);
              resolve(res2);
            })
            .catch((err) => console.log("setUserChannels", err));
        })
        .catch((err) => console.log("getCurrentUser", err));
    });
  });
};

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
    "Профсоюзная организация НГТУ",
    "Студенческий совет",
    "РСМ",
    "Отряды",
    "Другое",
  ];

  const [error, setError] = useState(undefined);

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
          {error && <Text>{error}</Text>}

          <View style={styles.buttonContainer}>
            <BoldButton
              text="Готово"
              onPress={() => {
                console.log(
                  "Data",
                  institute,
                  course,
                  liveInDormitory,
                  dormitoryNumber,
                  interestedInStudentActivity,
                  studentOrganization
                );
                if (
                  institute === undefined ||
                  course === undefined ||
                  (liveInDormitory && dormitoryNumber === undefined)
                ) {
                  console.log("Введите обязательные поля");
                  setError("Введите обязательные поля");
                } else {
                  setError(undefined);
                  createAnonimousUserWithChannels(
                    institute,
                    course,
                    liveInDormitory,
                    dormitoryNumber,
                    interestedInStudentActivity,
                    studentOrganization
                  ).then((res) => {
                    navigation.push("RegistrationFinish");
                  });
                }
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
