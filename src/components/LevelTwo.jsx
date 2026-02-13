import { motion } from "framer-motion";
import rosesImage from "../assets/roses.png";

function LevelTwo({ setStage }) {
  return (
    <motion.div
      className="level"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h1
        className="title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        I knew you would say Yes!
      </motion.h1>

      <motion.p
        className="subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Here’s a little surprise for you.
      </motion.p>

      <motion.div
        className="roses-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <img
          src={rosesImage}
          alt="Roses"
          className="roses-image"
        />
      </motion.div>

      <motion.button
        className="present-btn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        onClick={() => setStage(3)}
      >
        🎁 Open it
      </motion.button>
    </motion.div>
  );
}

export default LevelTwo;
