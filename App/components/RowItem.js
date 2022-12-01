import React from "react";
import {Text, TouchableOpacity, StyleSheet, View } from "react-native"; // Импорт по именам
import colors from "../constants/colors"

// TODO add left icon

const styles = StyleSheet.create({
    row: {
        // paddingHorizontal: 20,
        paddingVertical: 16,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: colors.white,
        color: "#FF4662",
    },
    title: {
        fontSize: 16,
        color: colors.text,
    },
    separator: {
        backgroundColor: colors.border,
        height: StyleSheet.hairlineWidth, // Minimal height
        marginLeft: 20,
    },
})


export const RowItem = ({ title, onPress, rightIcon, textStyle ={} }) => (
  <TouchableOpacity onPress={onPress} style={styles.row}>
    <Text style={[styles.title, textStyle]}>{title}</Text>
    {rightIcon && rightIcon}
  </TouchableOpacity>
)

export const RowSeparator = () => <View style={styles.separator} />