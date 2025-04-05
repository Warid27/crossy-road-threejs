// utils/player-movement.js
import usePlayerStore from "@/store/player-store";

const { queueMove } = usePlayerStore.getState();

export const movePlayer = (direction) => {
  switch (direction) {
    case "forward":
      queueMove("forward");
      break;
    case "backward":
      queueMove("backward");
      break;
    case "left":
      queueMove("left");
      break;
    case "right":
      queueMove("right");
      break;
    default:
      console.warn(`Unknown direction: ${direction}`);
  }
};

export const setupKeyboardControls = () => {
  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      movePlayer("forward");
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      movePlayer("backward");
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      movePlayer("left");
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      movePlayer("right");
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  // Cleanup function for useEffect
  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
};
