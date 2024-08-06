import React, { useState } from "react";
import Constants from "expo-constants";
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import ModalComponent from "./RoutineModal";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
