import { create } from "zustand";

const usePostsStore = create((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts: [...posts] }),
  addPostToStore: (post) => set((state) => ({ posts: [post, ...state.posts ] })),
  removePost: (id) => set((state) => ({ posts: state.posts.filter(post => post.id !== id) }))
}));

export default usePostsStore;