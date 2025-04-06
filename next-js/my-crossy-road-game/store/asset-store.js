import { create } from "zustand";

const useAssets = create((set) => ({
  baseAssetUrl: process.env.NEXT_PUBLIC_ASSET_URL || "",
  setBaseAssetUrl: (url) => set({ baseAssetUrl: url }),
}));

export default useAssets;
