import React from "react";
import { View } from "react-native";
import { useRoute } from "@react-navigation/native";
import AddCommentModal from "../AddCommentModal/AddCommentModal";
import Post from "../../components/Post/Post";
import Comments from "../../components/Comments/Comments";

export default function PostScreen() {
  const route = useRoute();

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Post postId={route.params.postId ? route.params.postId : null} />
      <Comments postId={route.params.postId ? route.params.postId : null} />
      <AddCommentModal
        postId={route.params.postId ? route.params.postId : null}
      />
    </View>
  );
}
