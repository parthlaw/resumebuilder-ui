import { motion } from "framer-motion";

const FloatingStars = () => {
  return (
    <g>
      {/* Right Star - Moves Down/Up and Rotates */}
      <motion.g
        animate={{ y: [-10, 10, -10], rotate: [0, 360] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "420px 250px" }}
      >
        <path
          d="M 420 245 L 422 250 L 427 252 L 422 254 L 420 259 L 418 254 L 413 252 L 418 250 Z"
          fill="currentColor"
          className="text-accent"
        />
      </motion.g>
      
      {/* Left Star - Moves Up/Down and Rotates Reverse */}
      <motion.g
        animate={{ y: [10, -10, 10], rotate: [360, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "60px 130px" }}
      >
        <path
          d="M 60 125 L 62 130 L 67 132 L 62 134 L 60 139 L 58 134 L 53 132 L 58 130 Z"
          fill="currentColor"
          className="text-primary"
        />
      </motion.g>
    </g>
  );
};

export default FloatingStars;

