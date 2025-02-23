import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useRef } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  measure,
} from "react-native-reanimated";
import colors from "../../constants/colors";
import Replies from "../Replies/Replies";

export default function Comment({ comment }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const heightAnim = useSharedValue(0);
  const contentRef = useRef(null);

  const toggleReplies = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      requestAnimationFrame(() => {
        if (contentRef.current) {
          const measuredHeight = measure(contentRef.current)?.height || 600; //
          heightAnim.value = withTiming(measuredHeight, { duration: 300 });
        }
      });
    } else {
      heightAnim.value = withTiming(0, { duration: 300 });
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    maxHeight: heightAnim.value,
    opacity: heightAnim.value > 0 ? 1 : 0,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.secondaryTxt}>{comment.author}</Text>
        <Text style={styles.secondaryTxt}>
          {new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date(comment.timestamp?.seconds * 1000))}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.commentTxt}>{comment.text}</Text>
        <TouchableOpacity onPress={toggleReplies}>
          <Text style={styles.replyBtn}>{isExpanded ? "Hide" : "Reply"}</Text>
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.repliesContainer, animatedStyle]}>
        <View ref={contentRef} onLayout={() => {}}>
          <Replies comment={comment} />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "96%",
    marginLeft: "2%",
    marginTop: 10,
    flexDirection: "column",
    justifyContent: "space-around",
    borderLeftColor: colors.mainBlue,
    borderLeftWidth: 1,
  },
  row: {
    width: "98%",
    marginLeft: "1%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentTxt: {
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
  replyBtn: {
    color: colors.mainBlue,
    fontSize: 14,
    fontWeight: "bold",
  },
  repliesContainer: {
    overflow: "hidden",
    backgroundColor: "#f2f2f2",
    marginTop: 5,
    borderRadius: 5,
    padding: 5,
  },
  repliesText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.mainBlue,
  },
});
