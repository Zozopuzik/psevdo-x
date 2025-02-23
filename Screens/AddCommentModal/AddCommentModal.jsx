import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../../constants/colors";
import useModalsStore from "../../Stores/modalsStore";
import firebaseManipulations from "../../api/firebaseManipulations";
import useUserStore from "../../Stores/userStore";
import useCommentsStore from "../../Stores/commentsStore";

export default function AddCommentModal({ postId }) {
  const { isNewCommentModalShown, hideNewCommentModal } = useModalsStore();
  const { addCommentToStore } = useCommentsStore();
  const { user } = useUserStore();
  const translateY = useSharedValue(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (isNewCommentModalShown) {
      translateY.value = withTiming(0, { duration: 300 });
    } else {
      translateY.value = withTiming(height, { duration: 300 });
    }
  }, [isNewCommentModalShown]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleSendComment = async () => {
    if (comment.trim().length > 0) {
      console.log("Submitted comment:", comment);
      const commentToSave = await firebaseManipulations.addNewComment(
        postId,
        user.email,
        comment
      );
      addCommentToStore(commentToSave);
      console.log(commentToSave);
      setComment("");
      hideNewCommentModal();
    }
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={hideNewCommentModal}>
          <FontAwesome name="close" size={25} color={colors.white} />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>Comment Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your comment..."
        placeholderTextColor={colors.lightGray}
        value={comment}
        onChangeText={setComment}
      />
      <TouchableOpacity style={styles.button} onPress={handleSendComment}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: width * 0.02,
    width: width * 0.96,
    height: 300,
    borderTopColor: colors.darkBlue,
    borderTopWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderLeftColor: colors.darkBlue,
    borderLeftWidth: 2,
    borderRightColor: colors.darkBlue,
    borderRightWidth: 2,
    alignItems: "center",
    backgroundColor: colors.mainBlue,
    zIndex: 10,
    padding: 20,
  },
  headerRow: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  text: {
    color: colors.white,
    width: "100%",
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    marginTop: 30,
  },
  button: {
    width: "100%",
    backgroundColor: colors.darkBlue,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
