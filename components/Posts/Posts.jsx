import { View, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../fireBaseConfig";
import { collection, getDocs } from "firebase/firestore";
import usePostsStore from "../../Stores/postsStore";
import PostCard from "../PostCard/PostCard";
export default function Posts() {
  const [loading, setLoading] = useState(false)
  const { posts, setPosts } = usePostsStore();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postData = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => b.timestamp - a.timestamp);
        console.log(postData)
        setPosts(postData);
        setTimeout(() => {
          setLoading(false)
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  if(loading){
    return (
      <>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
      </>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}> 
        {posts.map((post, index) => (
          <PostCard post={post} key={index} />
        ))}
      </ScrollView>
    </View>
  );
}
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    height: height * 0.75,
    marginTop: 10
  },
  scroll: {
    width: '100%',
    height: '100%',
  }
  
});
