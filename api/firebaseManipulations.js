import { db } from "../fireBaseConfig";
import {
  deleteDoc,
  doc,
  getDoc,
  addDoc,
  collection,
  Timestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const firebaseManipulations = {
  getPostById: async (postId) => {
    const postRef = doc(db, "posts", postId);
    try {
      const postSnapshot = await getDoc(postRef);
      if (postSnapshot.exists()) {
        return postSnapshot.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting post: ", error);
    }
  },

  addNewPost: async (postText, user) => {
    try {
      const newPost = {
        text: postText,
        timestamp: Timestamp.now(),
        author: user.email,
        shortText:
          postText.length > 80 ? postText.slice(0, 80) + "..." : postText,
      };
      const docRef = await addDoc(collection(db, "posts"), newPost);
      newPost.id = docRef.id;
      return newPost;
    } catch (error) {
      console.error("Error adding post:", error);
    }
  },

  deletePostById: async (postId) => {
    try {
      const commentsQuery = query(
        collection(db, "comments"),
        where("parentPostId", "==", postId)
      );
      const commentsSnapshot = await getDocs(commentsQuery);
      for (const commentDoc of commentsSnapshot.docs) {
        const commentId = commentDoc.id;
        const repliesQuery = query(
          collection(db, "replies"),
          where("parentCommentId", "==", commentId)
        );
        const repliesSnapshot = await getDocs(repliesQuery);
        for (const replyDoc of repliesSnapshot.docs) {
          await deleteDoc(doc(db, "replies", replyDoc.id));
        }
        await deleteDoc(doc(db, "comments", commentId));
      }
      await deleteDoc(doc(db, "posts", postId));
    } catch (error) {
      console.error("Error deleting post, comments, or replies:", error);
    }
  },

  getCommentsForPost: async (postId) => {
    try {
      const q = query(
        collection(db, "comments"),
        where("parentPostId", "==", postId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  },

  addNewComment: async (parentPostId, author, comment) => {
    try {
      const newComment = {
        text: comment,
        timestamp: Timestamp.now(),
        author: author,
        parentPostId: parentPostId,
      };
      const docRef = await addDoc(collection(db, "comments"), newComment);
      newComment.id = docRef.id;
      return newComment;
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  },

  addNewReply: async (replyText, user, parentPostId, parentCommentId) => {
    try {
      const newReply = {
        text: replyText,
        timestamp: Timestamp.now(),
        author: user.email,
        parentPostId: parentPostId,
        parentCommentId: parentCommentId,
      };
      const docRef = await addDoc(collection(db, "replies"), newReply);
      newReply.id = docRef.id;
      return newReply;
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  },

  getRepliesToComment: async (commentId) => {
    try {
      const q = query(
        collection(db, "replies"),
        where("parentCommentId", "==", commentId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching replies:", error);
      return [];
    }
  },
};

export default firebaseManipulations;
