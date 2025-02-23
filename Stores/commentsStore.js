import { create } from "zustand";

const useCommentsStore = create((set) => ({
  comments: [],
  setComments: (comments) => set({ comments: [...comments] }),
  addCommentToStore: (comment) => set((state) => ({ comments: [comment, ...state.comments ] })),
}));

export default useCommentsStore;