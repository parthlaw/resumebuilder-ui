import { motion } from "framer-motion";

const AISparkle = () => {
  return (
    <g>
      {/* Glow Background */}
      <circle
        cx="360"
        cy="100"
        r="30"
        fill="currentColor"
        className="text-accent opacity-20"
      />
      
      {/* Main Sparkle - Rotating Clockwise */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ transformOrigin: "360px 100px" }}
      >
        <path
          d="M 360 85 L 362 95 L 372 97 L 362 99 L 360 109 L 358 99 L 348 97 L 358 95 Z"
          fill="currentColor"
          className="text-accent"
        />
      </motion.g>
      
      {/* Secondary Sparkle - Rotating Counter-clockwise */}
      <motion.g
        animate={{ rotate: -360 }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ transformOrigin: "380px 110px" }}
      >
        <path
          d="M 380 100 L 381 106 L 387 107 L 381 108 L 380 114 L 379 108 L 373 107 L 379 106 Z"
          fill="currentColor"
          className="text-primary"
        />
      </motion.g>
    </g>
  );
};

export default AISparkle;

