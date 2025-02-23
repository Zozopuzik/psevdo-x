import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useUserStore from "../../Stores/userStore";
import usePostsStore from "../../Stores/postsStore";
import firebaseManipulations from "../../api/firebaseManipulations";
export default function PostCard({ post }) {
  const { user } = useUserStore();
  const { removePost } = usePostsStore();
  const navigation = useNavigation();

  const deletePost = async (id) => {
    await firebaseManipulations.deletePostById(id);
    removePost(id);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.postTxtContainer}
        onPress={() => navigation.navigate("Post", { postId: post.id })}
      >
        <Text style={styles.postTxt}>{post.shortText}</Text>
      </TouchableOpacity>
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
      <View style={styles.btnsRow}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Post", { postId: post.id })}
        >
          <FontAwesome
            name={"commenting-o"}
            size={20}
            color={colors.mainBlue}
          />
        </TouchableOpacity>
        {user.email === post.author ? (
          <TouchableOpacity onPress={() => deletePost(post.id)}>
            <FontAwesome name={"trash-o"} size={20} color={colors.red} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "96%",
    marginLeft: "2%",
    height: 120,
    borderWidth: 3,
    marginTop: 5,
    borderColor: colors.darkBlue,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  row: {
    width: "98%",
    marginLeft: "1%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postTxtContainer: {
    width: "100%",
  },
  postTxt: {
    fontSize: 16,
    color: colors.mainBlue,
    width: "85%",
    paddingLeft: 5,
  },
  secondaryTxt: {
    fontSize: 12,
    color: "grey",
    fontWeight: "600",
  },
  btnsRow: {
    width: "20%",
    marginLeft: "80%",
    justifyContent: "space-around",
    flexDirection: "row",
  },
});
