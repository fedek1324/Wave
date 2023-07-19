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
      const channels = ["NSTU n. a. R. E. Alekseev"];
      if (institute !== "Other") channels.push(institute);
      if (course !== "Other") channels.push(`${course} course`);
      if (liveInDormitory) channels.push(`${dormitoryNumber} dormitory`);
      if (interestedInStudentActivity) channels.push("Student life");
      if (
        interestedInStudentActivity &&
        studentOrganization &&
        studentOrganization !== "Other"
      )
        channels.push(studentOrganization);

      console.log("Pushing channels", channels);
      getCurrentUser()
        .then((user) => {
          // Change this to add channels not to set
          setUserChannels({userId : user.uid, channelsNames : channels})
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

const Selection = ({ navigation, subject, options, setState }) => {
  const createSelection = () => {
    return (
      <RowItem
        title={subject}
        onPress={() => {
          navigation.push("Selection", {
            title: subject,
            options,
            setState,
          });
        }}
        rightIcon={<Chevron fill={colors.tertiary} />}
      />
    );
  };

  return createSelection();
};

export default ({ navigation }) => {
  const [institute, setInstitute] = useState(undefined);
  const institutes = [
    "IRIT",
    "ITS",
    "IPTM",
    "IAiETF",
    "INEL",
    "IFHTiM",
    "INEU",
    "Other",
  ];

  const [liveInDormitory, setLiveInDormitory] = useState(false);

  const [course, setCourse] = useState(undefined);
  const courses = ["1", "2", "3", "4", "5", "6", "Other"];

  const [dormitoryNumber, setDormitoryNumber] = useState(undefined);
  const dormitoryNumbers = ["1", "2", "3", "4", "5", "6"];

  const [interestedInStudentActivity, setInterestedInStudentActivity] =
    useState(false);

  const [studentOrganization, setstudentOrganization] = useState(undefined);
  const studentOrganizations = [
    "NSTU Trade Union Organization",
    "Student Council",
    "RSM",
    "Squads",
    "Other",
  ];

  const [error, setError] = useState(undefined);

  return (
    <View style={styles.container}>
      <StatusBar // не элемент а просто найстройка
        barStyle="light-content"
        backgroundColor={colors.blue}
      />
      <SafeAreaView>
        <View style={styles.content}>
          <Selection
            navigation={navigation}
            subject="Institute"
            options={institutes}
            setState={setInstitute}
          />
          <Selection
            navigation={navigation}
            subject="Course"
            options={courses}
            setState={setCourse}
          />
          <MySwitch
            text="I live in a dormitory"
            state={liveInDormitory}
            changeState={setLiveInDormitory}
          />
          {liveInDormitory && (
            <Selection
              navigation={navigation}
              subject="Dormitory number"
              options={dormitoryNumbers}
              setState={setDormitoryNumber}
            />
          )}
          <MySwitch
            text="Interested in student life"
            state={interestedInStudentActivity}
            changeState={setInterestedInStudentActivity}
          />
          {interestedInStudentActivity && (
            <Selection
              navigation={navigation}
              subject="Student organization (not necessary)"
              options={studentOrganizations}
              setState={setstudentOrganization}
            />
          )}
          {error && <Text>{error}</Text>}

          <View style={styles.buttonContainer}>
            <BoldButton
              text="Ok"
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
                  console.log("Enter the required fields");
                  setError("Enter the required fields");
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
