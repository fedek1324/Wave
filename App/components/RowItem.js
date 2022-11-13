import React from "react";
import {Text, TouchableOpacity, StyleSheet, View } from "react-native"; // Импорт по именам
import colors from "../constants/colors"

const styles = StyleSheet.create({
    row: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: colors.white,
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


export const RowItem = ({ title, onPress, rightIcon }) => (
  <TouchableOpacity onPress={onPress} style={styles.row}>
    <Text style={styles.title}>{title}</Text>
    {rightIcon}
  </TouchableOpacity>
)

export const RowSeparator = () => <View style={styles.separator} />