import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import colors from "../../constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import useModalsStore from "../../Stores/modalsStore";

export default function AddPostBtn() {
  const { showNewPostModal } = useModalsStore();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          showNewPostModal();
        }}
      >
        <FontAwesome name={"plus"} size={25} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingRight: height * 0.05,
    position: "absolute",
    bottom: height * 0.05,
    zIndex: 10,
    alignItems: "flex-end",
  },
  btn: {
    width: 50,
    height: 50,
    backgroundColor: colors.mainBlue,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.darkBlue,
    overflow: "hidden",
  },
});
