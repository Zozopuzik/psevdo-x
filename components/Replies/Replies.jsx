import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../constants/colors";
import useUserStore from "../../Stores/userStore";
import firebaseManipulations from "../../api/firebaseManipulations";
import Reply from "../Reply/Reply";

export default function Replies({ comment }) {
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState([]);
  const [loadingReplies, setLoadingReplies] = useState(true);
  const { user } = useUserStore();

  useEffect(() => {
    const fetchReplies = async () => {
      setLoadingReplies(true);
      console.log("Fetching replies for comment:", comment.id);
      const fetchedReplies = await firebaseManipulations.getRepliesToComment(
        comment.id
      );
      setReplies(fetchedReplies);
      setLoadingReplies(false); 
    };

    fetchReplies();
  }, [comment]);

  const handleSendReply = async () => {
    if (replyText.trim()) {
      console.log("Replying to comment:", comment.id, "with text:", replyText);
      const newReply = await firebaseManipulations.addNewReply(
        replyText,
        user,
        comment.parentPostId,
        comment.id
      );

      if (newReply) {
        setReplies((prevReplies) => [...prevReplies, newReply]);
        setReplyText("");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.authorText}>
        Replies to: {comment.author}'s comment
      </Text>

      {loadingReplies ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.mainBlue} />
        </View>
      ) : replies.length > 0 ? (
        <ScrollView style={styles.scrollContainer}>
          {replies.map((reply, index) => (
            <Reply key={index} reply={reply} />
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noRepliesText}>No replies yet</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Write a reply..."
        placeholderTextColor={colors.gray}
        value={replyText}
        onChangeText={setReplyText}
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSendReply}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  authorText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.mainBlue,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 8,
    borderWidth: 1,
    borderColor: colors.mainBlue,
    borderRadius: 5,
    backgroundColor: colors.white,
    color: colors.darkBlue,
  },
  sendButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: colors.mainBlue,
    borderRadius: 5,
    alignItems: "center",
  },
  sendButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
  scrollContainer: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    padding: 5,
  },
  noRepliesText: {
    textAlign: "center",
    color: "gray",
    fontStyle: "italic",
    paddingVertical: 10,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 150, // Высота контейнера, чтобы индикатор загрузки был по центру
  },
});
