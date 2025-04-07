import { motion } from "framer-motion";

export const Controller = ({
  movePlayer,
  setActiveDirection,
  activeDirection,
}) => {
  const buttonVariants = {
    idle: {
      scale: 1,
      boxShadow: "3px 5px 0px 0px rgba(0,0,0,0.75)",
    },
    pressed: {
      scale: 0.95,
      boxShadow: "1px 2px 0px 0px rgba(0,0,0,0.75)",
    },
  };

  return (
    <div
      id="controls"
      className="absolute bottom-5 w-full flex justify-center items-end"
    >
      <div className="grid grid-cols-3 gap-2.5 w-[150px]">
        {/* Forward Button */}
        <motion.button
          onClick={() => {
            movePlayer("forward");
            setActiveDirection("forward");
            setTimeout(() => setActiveDirection(null), 200);
          }}
          id="forward"
          aria-label="Move Forward"
          className={`col-span-3 w-full h-10 bg-white border border-gray-300 cursor-pointer outline-none hover:bg-gray-100`}
          style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
          variants={buttonVariants}
          animate={activeDirection === "forward" ? "pressed" : "idle"}
          transition={{ duration: 0.1 }}
        >
          {`\u25B2`}
        </motion.button>

        {/* Left Button */}
        <motion.button
          onClick={() => {
            movePlayer("left");
            setActiveDirection("left");
            setTimeout(() => setActiveDirection(null), 200);
          }}
          id="left"
          aria-label="Move Left"
          className={`w-full h-10 bg-white border border-gray-300 cursor-pointer outline-none hover:bg-gray-100`}
          style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
          variants={buttonVariants}
          animate={activeDirection === "left" ? "pressed" : "idle"}
          transition={{ duration: 0.1 }}
        >
          {"\u25C0"}
        </motion.button>

        {/* Backward Button */}
        <motion.button
          onClick={() => {
            movePlayer("backward");
            setActiveDirection("backward");
            setTimeout(() => setActiveDirection(null), 200);
          }}
          id="backward"
          aria-label="Move Backward"
          className={`w-full h-10 bg-white border border-gray-300 cursor-pointer outline-none hover:bg-gray-100`}
          style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
          variants={buttonVariants}
          animate={activeDirection === "backward" ? "pressed" : "idle"}
          transition={{ duration: 0.1 }}
        >
          {"\u25BC"}
        </motion.button>

        {/* Right Button */}
        <motion.button
          onClick={() => {
            movePlayer("right");
            setActiveDirection("right");
            setTimeout(() => setActiveDirection(null), 200);
          }}
          id="right"
          aria-label="Move Right"
          className={`w-full h-10 bg-white border border-gray-300 cursor-pointer outline-none hover:bg-gray-100`}
          style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
          variants={buttonVariants}
          animate={activeDirection === "right" ? "pressed" : "idle"}
          transition={{ duration: 0.1 }}
        >
          {"\u25B6"}
        </motion.button>
      </div>
    </div>
  );
};
