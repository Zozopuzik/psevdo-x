import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import useModalsStore from "../../Stores/modalsStore";
import colors from "../../constants/colors";
import useUserStore from "../../Stores/userStore";
import usePostsStore from "../../Stores/postsStore";
import firebaseManipulations from "../../api/firebaseManipulations";

export default function NewPostModal() {
  const { isNewPostModalShown, hideNewPostModal } = useModalsStore();
  const [postText, setPostText] = useState("");
  const { user } = useUserStore();
  const { addPostToStore } = usePostsStore();
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isNewPostModalShown) {
      opacity.value = withTiming(1, { duration: 1000 }); // Плавное появление за 1 сек
    }
  }, [isNewPostModalShown]);

  const handleCloseModal = () => {
    opacity.value = withTiming(0, { duration: 500 });
    setTimeout(() => {
      hideNewPostModal();
      setPostText("");
    }, 550);
  };
  const addNewPost = async () => {
    try {
      if (postText.trim() === "") {
        Alert.alert("Please enter some text!");
        return;
      }
      const newPost = await firebaseManipulations.addNewPost(postText, user);
      addPostToStore({ ...newPost });
      setPostText("");
      console.log("Post added successfully!");
      opacity.value = withTiming(0, { duration: 500 });
      setTimeout(() => {
        hideNewPostModal();
        setPostText("");
      }, 550);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!isNewPostModalShown) {
    return null;
  }

  return (
    <Animated.View style={[styles.modalContainer, animatedStyle]}>
      <View style={styles.modal}>
        <Text style={styles.title}>What's on your mind?</Text>
        <TextInput
          style={styles.input}
          placeholder="Write something..."
          placeholderTextColor={colors.gray}
          multiline
          numberOfLines={3}
          value={postText}
          onChangeText={setPostText}
        />
        <TouchableOpacity
          style={styles.addPostBtn}
          onPress={() => addNewPost()}
        >
          <Text style={styles.addPostTxt}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCloseModal()}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelText}>Cancel post</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(46, 45, 45, 0.6)",
    zIndex: 20,
  },
  modal: {
    width: 300,
    padding: 20,
    backgroundColor: colors.white,
    alignItems: "center",
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: colors.darkBlue,
  },
  input: {
    width: "100%",
    height: 80,
    borderColor: colors.mainBlue,
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 5,
  },
  addPostBtn: {
    width: "80%",
    backgroundColor: colors.mainBlue,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.darkBlue,
  },
  addPostTxt: {
    color: colors.white,
    fontSize: 16,
    textTransform: "uppercase",
    width: "80%",
    textAlign: "center",
  },

  cancelText: {
    color: colors.red,
    fontSize: 16,
    textDecorationLine: "underline",
    textTransform: "uppercase",
    width: "80%",
    textAlign: "center",
  },
});
