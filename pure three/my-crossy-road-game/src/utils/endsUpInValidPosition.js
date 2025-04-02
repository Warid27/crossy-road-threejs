import { calculateFinalPosition } from "./calculateFinalPosition";
import { minTileIndex, maxTileIndex } from "../constant";
import { metadata as rows } from "../components/Map";

export function endsUpInValidPosition(currentPosition, moves) {
  const finalPosition = calculateFinalPosition(currentPosition, moves);

  // If hit the edge of the board
  if (
    finalPosition.rowIndex === -1 ||
    finalPosition.maxTileIndex === minTileIndex - 1 ||
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
