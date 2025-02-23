import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useUserStore from "../../Stores/userStore";
import MainPageHeader from "../../components/MainPageHeader/MainPageHeader";
import AddPostBtn from "../../components/AddPostBtn/AddPostBtn";
import NewPostModal from "../NewPostModal/NewPostModal";
import Posts from "../../components/Posts/Posts";
export default function MainScreen() {
  const { user } = useUserStore();
  console.log(user);
  return (
    <SafeAreaView style={styles.container}>
      <MainPageHeader email={user.email} />
      <Posts />
      <NewPostModal />
      <AddPostBtn />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 10,
  },
});
