import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";
import colors from "../../constants/colors";
import firebaseManipulations from "../../api/firebaseManipulations";
import useUserStore from "../../Stores/userStore";
import useModalsStore from "../../Stores/modalsStore";
import { useNavigation } from "@react-navigation/native";
import usePostsStore from "../../Stores/postsStore";

export default function Post({ postId }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUserStore();
  const { removePost } = usePostsStore();
  const navigation = useNavigation();
  const { showNewCommentModal } = useModalsStore();
  const deletePost = async (id) => {
    await firebaseManipulations.deletePostById(id);
    removePost(id);
    navigation.goBack();
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        console.log(postId);
        if (postId) {
          const postFromDb = await firebaseManipulations.getPostById(postId);
          setPost(postFromDb);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [postId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.secondaryTxt}>{post.author}</Text>
        <Text style={styles.secondaryTxt}>
          {new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date(post.timestamp?.seconds * 1000))}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.postText}>{post.text}</Text>
      </View>
      <View style={styles.btnsRow}>
        <TouchableOpacity onPress={() => showNewCommentModal()}>
          <FontAwesome
            name={"commenting-o"}
            size={20}
            color={colors.mainBlue}
          />
        </TouchableOpacity>
        {user.email === post.author ? (
          <TouchableOpacity onPress={() => deletePost(postId)}>
            <FontAwesome name={"trash-o"} size={20} color={colors.red} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomColor: colors.darkBlue,
    borderBottomWidth: 2,
    paddingBottom: 10,
  },
  row: {
    width: "96%",
    marginLeft: "2%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  textContainer: {
    width: "96%",
    marginLeft: "2%",
    padding: 5,
  },
  postText: {
    color: colors.darkBlue,
    fontSize: 16,
    fontWeight: "400",
    width: "100%",
    textAlign: "justify",
  },
  secondaryTxt: {
    color: colors.mainBlue,
    fontSize: 12,
    fontWeight: "400",
  },
  btnsRow: {
    width: "20%",
    marginLeft: "80%",
    justifyContent: "space-around",
    flexDirection: "row",
  },
});
