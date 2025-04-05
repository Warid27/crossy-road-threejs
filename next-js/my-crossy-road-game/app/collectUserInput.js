// utils/player-movement.js
import usePlayerStore from "@/store/player-store";

const { queueMove } = usePlayerStore.getState();

export const movePlayer = (direction) => {
  switch (direction) {
    case "forward":
    case "backward":
    case "left":
    case "right":
      queueMove(direction);
      break;
    default:
      console.warn(`Unknown direction: ${direction}`);
  }
};

export const setupKeyboardControls = (setActiveDirection) => {
  const handleKeyDown = (event) => {
    let direction = null;

    // Determine the direction based on the key pressed
    if (event.key === "ArrowUp") {
      direction = "forward";
    } else if (event.key === "ArrowDown") {
      direction = "backward";
    } else if (event.key === "ArrowLeft") {
      direction = "left";
    } else if (event.key === "ArrowRight") {
      direction = "right";
    }

    if (direction) {
      event.preventDefault();
      setActiveDirection(direction); // Set the active direction
      movePlayer(direction); // Move the player

      // Reset the active direction after 200ms
      setTimeout(() => {
        setActiveDirection(null);
      }, 200);
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  // Cleanup function for useEffect
  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
};
