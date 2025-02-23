import { create } from "zustand";

const useRepliesStore = create((set) => ({
  replies: [],
  setReplies: (replies) => set({ replies: [...replies] }),
  addReplyToStore: (reply) => set((state) => ({ replies: [reply, ...state.replies ] })),
  clearRepliesStore: () => set((state) => ({ replies: [] })),
}));

export default useRepliesStore;