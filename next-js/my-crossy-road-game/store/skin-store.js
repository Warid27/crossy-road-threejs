import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the Zustand store with persistence
const useSkinStateStore = create(
  persist(
    (set, get) => ({
      skin: "cat", // Default state
      updateSkin: (newSkin) => set({ skin: newSkin }), // Action to update state
    }),
    {
      name: "skin-storage", // Unique key for localStorage
      getStorage: () => localStorage, // Use localStorage as the storage engine
    }
  )
);

export default useSkinStateStore;
