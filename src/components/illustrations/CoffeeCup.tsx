import { motion } from "framer-motion";

const CoffeeCup = () => {
  return (
    <g>
      {/* Coffee Cup Body */}
      <rect
        x="70"
        y="360"
        width="40"
        height="45"
        rx="4"
        fill="currentColor"
        className="text-accent"
      />
      
      {/* Coffee Inside */}
      <rect
        x="75"
        y="365"
        width="30"
        height="30"
        rx="2"
        fill="currentColor"
        className="text-card"
      />
      
      {/* Cup Handle */}
      <path
        d="M 110 375 Q 120 375 120 385 Q 120 395 110 395"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        className="text-accent"
      />
      
      {/* Steam Animation */}
      <motion.g
        animate={{ y: [-2, 2, -2], opacity: [0.5, 0.8, 0.5] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <path
          d="M 80 350 Q 82 345 84 350"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-muted-foreground"
          strokeLinecap="round"
        />
        <path
          d="M 90 350 Q 92 345 94 350"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-muted-foreground"
          strokeLinecap="round"
        />
        <path
          d="M 100 350 Q 102 345 104 350"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-muted-foreground"
          strokeLinecap="round"
        />
      </motion.g>
    </g>
  );
};

export default CoffeeCup;

