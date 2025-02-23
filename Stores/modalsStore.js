import { create } from "zustand";

const useModalsStore = create((set) => ({
  isNewPostModalShown: false,
  showNewPostModal: () => set({ isNewPostModalShown: true }),
  hideNewPostModal: () => set({ isNewPostModalShown: false }),
  isNewCommentModalShown: false,
  showNewCommentModal: () => set({ isNewCommentModalShown: true }),
  hideNewCommentModal: () => set({ isNewCommentModalShown: false }),
}));

export default useModalsStore;
