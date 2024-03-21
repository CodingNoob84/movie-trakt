import { create } from "zustand";

const useViewStore = create((set) => ({
  view: "small", // Initial view state
  setView: (newView) => set(() => ({ view: newView })),
}));

export default useViewStore;
