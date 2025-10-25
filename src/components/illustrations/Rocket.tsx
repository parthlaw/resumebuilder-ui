import { motion } from "framer-motion";

const Rocket = () => {
  return (
    <motion.g
      animate={{ y: [-5, 5, -5] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <path
        d="M 80 200 L 90 180 L 100 200 L 95 200 L 95 220 L 85 220 L 85 200 Z"
        fill="currentColor"
        className="text-primary"
      />
      <circle
        cx="90"
        cy="195"
        r="3"
        fill="currentColor"
        className="text-card"
      />
      <path
        d="M 80 220 L 85 230 L 85 220 Z"
        fill="currentColor"
        className="text-accent"
      />
      <path
        d="M 100 220 L 95 230 L 95 220 Z"
        fill="currentColor"
        className="text-accent"
      />
    </motion.g>
  );
};

export default Rocket;
