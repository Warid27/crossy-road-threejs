import { calculateFinalPosition } from "./calculateFinalPosition";
import { minTileIndex, maxTileIndex } from "../app/constant";
import useMapStore from "@/store/map-store";

export function endsUpInValidPosition(currentPosition, moves) {
  const mapStore = useMapStore.getState();
  const rows = mapStore.getMetadata();
  const finalPosition = calculateFinalPosition(currentPosition, moves);
  // If hit the edge of the board
  if (
    finalPosition.rowIndex === -1 ||
    finalPosition.tileIndex === minTileIndex - 1 ||
    finalPosition.tileIndex === maxTileIndex + 1
  ) {
    // Invalid move, ignore command
    return false;
  }

  // If hit tree
  const finalRow = rows[finalPosition.rowIndex - 1];
  if (
    finalRow &&
    finalRow.type === "forest" &&
    finalRow.trees.some((tree) => tree.tileIndex === finalPosition.tileIndex)
  ) {
    // Invalid move, ignore command
    return false;
  }

  return true;
}
