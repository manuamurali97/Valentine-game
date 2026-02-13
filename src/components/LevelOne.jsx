import { useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import waiterImage from "../assets/valentineimg.png";
import happyImage from "../assets/happyImg.png";

function LevelOne({ setStage }) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isHappy, setIsHappy] = useState(false);
  const containerRef = useRef(null);
  const [yesScale, setYesScale] = useState(1);


  const sparkles = useMemo(() => {
    return [...Array(8)].map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 8 + Math.random() * 6
    }));
  }, []);

  const moveNoButton = () => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const randomX = (Math.random() - 0.5) * rect.width;
    const randomY = (Math.random() - 0.5) * rect.height;

    setNoPosition({ x: randomX, y: randomY });
    setYesScale(prev => prev + 0.1);
  };

  return (
    <div className="level" ref={containerRef}>
      <h2 className="title">
        Will you be my Valentine?
      </h2>

      <div className="image-wrapper">

        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="sparkle"
            style={{
              top: sparkle.top + "%",
              left: sparkle.left + "%",
              width: sparkle.size,
              height: sparkle.size
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity
            }}
          />
        ))}

        <motion.img
          src={isHappy ? happyImage : waiterImage}
          alt="Character"
          className="waiter-image"
          animate={{
            y: [0, -6, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity
          }}
        />
      </div>

      <div className="button-area">
        <motion.button
          className="yes-btn"
          animate={{ scale: yesScale }}
          transition={{ type: "spring", stiffness: 200 }}
          onMouseEnter={() => setIsHappy(true)}
          onMouseLeave={() => setIsHappy(false)}
          onClick={() => setStage(2)}
        >
          Yes ❤️
        </motion.button>

        <motion.button
          className="no-btn"
          animate={{ x: noPosition.x, y: noPosition.y }}
          onMouseEnter={moveNoButton}
          onClick={moveNoButton}
        >
          No
        </motion.button>
      </div>
    </div>
  );
}

export default LevelOne;
