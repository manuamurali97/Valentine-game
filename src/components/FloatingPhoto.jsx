import { motion } from "framer-motion";

function FloatingPhoto({ src, delay }) {
  return (
    <motion.img
      src={src}
      className="memory-photo"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -6, 0]
      }}
      exit={{ opacity: 0 }}
      transition={{
        delay,
        duration: 1.5,
        y: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    />
  );
}

export default FloatingPhoto;
