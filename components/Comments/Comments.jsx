import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import firebaseManipulations from "../../api/firebaseManipulations";
import colors from "../../constants/colors";
import Comment from "../Comment/Comment";
import useCommentsStore from "../../Stores/commentsStore";
export default function Comments({ postId }) {
  const { comments, setComments } = useCommentsStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const commentsFromDb = await firebaseManipulations.getCommentsForPost(
          postId
        );
        setComments(commentsFromDb);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (comments.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.emptyTxt}>No comments for this post yet</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {comments.map((comment, index) => (
        <Comment comment={comment} key={index} />
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  emptyTxt: {
    fontSize: 16,
    color: colors.mainBlue,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  container: {
    width: "100%",
    flex: 1,
  },
});
