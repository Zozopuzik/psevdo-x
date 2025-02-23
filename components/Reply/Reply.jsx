import { View, Text, StyleSheet } from "react-native";
import React from "react";
import colors from "../../constants/colors";

export default function Reply({ reply }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.secondaryTxt}>{reply.author}</Text>
        <Text style={styles.secondaryTxt}>
          {new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Europe/Kiev",
          }).format(new Date(reply.timestamp?.seconds * 1000))}
        </Text>
      </View>
      <Text style={styles.mainText}>{reply.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "96%",
    marginLeft: "2%",
    height: 50,
    borderLeftWidth: 2,
    borderLeftColor: colors.darkBlue,
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 5,
  },
  row: {
    width: "98%",
    marginLeft: "1%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainText: {
    fontSize: 16,
    color: colors.mainBlue,
    width: "100%",
    paddingLeft: 5,
  },
  secondaryTxt: {
    fontSize: 12,
    color: "grey",
    fontWeight: "600",
  },
});
