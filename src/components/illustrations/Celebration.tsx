import { motion } from "framer-motion";

const Celebration = () => {
  return (
    <g>
      {/* Head */}
      <circle cx="200" cy="140" r="40" fill="currentColor" className="text-accent" />
      
      {/* Body */}
      <path d="M 200 180 L 200 270" stroke="currentColor" strokeWidth="12" strokeLinecap="round" className="text-accent" />
      
      {/* Arms - celebrating pose */}
      <motion.path
        d="M 200 200 L 160 160"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        className="text-accent"
        animate={{ rotate: [0, -10, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "200px 200px" }}
      />
      <motion.path
        d="M 200 200 L 240 160"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        className="text-accent"
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "200px 200px" }}
      />
      
      {/* Legs */}
      <path d="M 200 270 L 180 340" stroke="currentColor" strokeWidth="12" strokeLinecap="round" className="text-accent" />
      <path d="M 200 270 L 220 340" stroke="currentColor" strokeWidth="12" strokeLinecap="round" className="text-accent" />
      
      {/* Happy face */}
      <circle cx="190" cy="135" r="4" fill="white" />
      <circle cx="210" cy="135" r="4" fill="white" />
      <path d="M 185 150 Q 200 160 215 150" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
      
      {/* Trophy */}
      <g transform="translate(80, 280)">
        <path d="M 20 0 L 10 20 L 30 20 Z" fill="currentColor" className="text-success" />
        <rect x="15" y="20" width="10" height="15" fill="currentColor" className="text-success" />
        <rect x="10" y="35" width="20" height="5" fill="currentColor" className="text-success" />
        <circle cx="20" cy="10" r="3" fill="white" />
      </g>
      
      {/* Stars and confetti */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const radius = 100;
        const x = 200 + radius * Math.cos(angle);
        const y = 140 + radius * Math.sin(angle);
        
        return (
          <motion.g
            key={i}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [0, 1, 0], 
              rotate: [0, 360],
              x: [0, (x - 200) * 0.3],
              y: [0, (y - 140) * 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut"
            }}
          >
            <circle cx={x} cy={y} r="4" fill="currentColor" className={i % 3 === 0 ? "text-primary" : i % 3 === 1 ? "text-accent" : "text-success"} />
          </motion.g>
        );
      })}
    </g>
  );
};

export default Celebration;

