import { create } from "zustand";
import GameMap from "../components/Map";
import { generateRows } from "../utils/generateRows";

const useMapStore = create((set, get) => ({
  // Map instance
  map: new GameMap(),

  // Initialize the map
  initializeMap: () => {
    const { map } = get();

    // Clear existing map
    map.clear();

    // Add initial grass rows
    const grassRows = Array.from({ length: 5 }, (_, i) => ({
      type: "grass",
      rowIndex: -i,
    }));
    map.addRowsFromMetadata(grassRows);

    // Add initial gameplay rows
    get().addRows();
  },

  // Add new rows to the map
  addRows: (count = 20) => {
    const { map } = get();

    // Generate new row metadata
    const newMetadata = generateRows(count);

    // Add new rows to the map
    map.addRowsFromMetadata(newMetadata);
  },

  // Getters for easy access
  getMapModel: () => get().map.getMapModel(),
  getMetadata: () => get().map.getMetadata(),
}));

export default useMapStore;
