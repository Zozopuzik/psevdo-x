import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import colors from "../../constants/colors";

export default function AuthSwitcher({ showLogIn, setShowLogIn }) {
  const translateX = useSharedValue(showLogIn ? 0 : width * 0.3);

  useEffect(() => {
    translateX.value = withTiming(showLogIn ? 0 : width * 0.3, {
      duration: 300,
    });
  }, [showLogIn]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.indicator, animatedStyle]} />
      <TouchableOpacity style={styles.btn} onPress={() => setShowLogIn(true)}>
        <Text
          style={[
            styles.btnTxt,
            { color: showLogIn ? colors.white : colors.mainBlue },
          ]}
        >
          log in
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => setShowLogIn(false)}>
        <Text
          style={[
            styles.btnTxt,
            { color: showLogIn ? colors.mainBlue : colors.white },
          ]}
        >
          sign in
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.6,
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    borderColor: colors.mainBlue,
    borderRadius: 30,
    borderWidth: 2,
    justifyContent: "space-between",
    overflow: "hidden",
    position: "relative",
  },
  btn: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    position: "absolute",
    width: "50%",
    backgroundColor: colors.mainBlue,
    borderRadius: 30,
    height: "100%",
    left: 0,
  },
  btnTxt: {
    textTransform: "uppercase",
    fontWeight: "500",
  },
});
