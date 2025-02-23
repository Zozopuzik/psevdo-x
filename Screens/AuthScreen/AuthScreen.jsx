import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import colors from "../../constants/colors";
import LogInForm from "../../components/LogInForm/LogInForm";
import AuthSwitcher from "../../components/AuthSwitcher/AuthSwitcher";
import SignInForm from "../../components/SignInForm/SignInForm";
export default function AuthScreen() {
  const [showLogIn, setShowLogIn] = useState(true);
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(showLogIn ? 0 : -width * 0.75, {
      duration: 300,
    });
  }, [showLogIn]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.wrapper}>
      <AuthSwitcher setShowLogIn={setShowLogIn} showLogIn={showLogIn} />
      <View style={styles.container}>
        <Animated.View style={[styles.formWrapper, animatedStyle]}>
          <View style={styles.formContainer}>
            <LogInForm />
          </View>
          <View
            style={[styles.formContainer, { backgroundColor: colors.mainBlue }]}
          >
            <SignInForm />
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: width * 0.75,
    borderWidth: 2,
    borderColor: colors.mainBlue,
    borderRadius: 20,
    marginTop: 10,
    overflow: "hidden",
  },
  formWrapper: {
    flexDirection: "row",
    width: width * 0.75,
  },
  formContainer: {
    paddingVertical: 10,
    width: width * 0.75,
    alignItems: "center",
  },
});
