import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";

import { auth } from "../../fireBaseConfig";
import useUserStore from "../../Stores/userStore";
export default function MainPageHeader({ email }) {
  const { clearUser } = useUserStore();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      clearUser();
    } catch (error) {
      console.error("Sign out error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerTxtContainer}>
        <Text style={styles.headerTxt}>Hi, {email}</Text>
      </View>
      <TouchableOpacity onPress={() => handleLogout()}>
        <MaterialCommunityIcons name={"logout"} size={25} color={colors.red} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.mainBlue,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  headerTxtContainer: {
    width: "70%",
  },
  headerTxt: {
    fontWeight: 500,
    color: colors.white,
  },
});
