import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingPhoto from "./FloatingPhoto";

/* IMPORT YOUR 27 IMAGES */
import img1 from "../assets/memories/img1.webp";
import img2 from "../assets/memories/img2.webp";
import img3 from "../assets/memories/img3.webp";
import img4 from "../assets/memories/img4.webp";
import img5 from "../assets/memories/img6.webp";
import img6 from "../assets/memories/img5.png";
import img7 from "../assets/memories/img7.webp";
import img8 from "../assets/memories/img8.webp";
import img9 from "../assets/memories/img10.webp";
import img10 from "../assets/memories/img9.webp";
import img11 from "../assets/memories/img11.webp";
import img12 from "../assets/memories/img12.webp";
import img13 from "../assets/memories/img13.webp";
import img14 from "../assets/memories/img14.webp";
import img15 from "../assets/memories/img15.webp";
import img16 from "../assets/memories/img16.webp";
import img17 from "../assets/memories/img17.webp";
import img18 from "../assets/memories/img18.png";
import img19 from "../assets/memories/img19.webp";
import img20 from "../assets/memories/img20.webp";
import img21 from "../assets/memories/img21.webp";
//import img22 from "../assets/memories/img22.png";
import img23 from "../assets/memories/img23.webp";
import img24 from "../assets/memories/img24.webp";
import img25 from "../assets/memories/img25.webp";
import img26 from "../assets/memories/img26.webp";
//import img27 from "../assets/memories/img27.png";

function MemoryMontage() {
  const allImages = [
    img1,img2,img3,img4,img5,img7,img8,img13,img9,
    img10,img11,img12,img14,img15,img16,img17,
    img19,img20,img21,img23,img24,img25
  ];

  /* Split into chapters */
  const chapters = [
    { caption: "Remember our first meeting?", images: allImages.slice(0,1) },
    { caption: "From strangers... to friends... to Someone Special!", images: allImages.slice(1,4) },
    { caption: "It was the little moments that quietly meant everything.", images: allImages.slice(4,8) },
    { caption: "We laughed. We cried. And somehow, we figured it out together", images: allImages.slice(8,11) },
    { caption: "And here we are - still walking hand-in-hand", images: allImages.slice(11,17) },
    { caption: "Still choosing us, every single day...", images: allImages.slice(17,24) }
  ];

  const [chapterIndex, setChapterIndex] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  

  /* Automatic progression */
  useEffect(() => {
    if (chapterIndex >= chapters.length) {
      setTimeout(() => setShowFinal(true), 2000);
      return;
    }

    const timer = setTimeout(() => {
      setChapterIndex(prev => prev + 1);
    }, 9000); 

    return () => clearTimeout(timer);
  }, [chapterIndex]);

  return (
    <div className="montage-container">

      {/* FINAL MESSAGE */}
      {showFinal && (
  <motion.div
    className="final-wrapper"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 3,
      ease: "easeOut"
    }}
  >
    <motion.h1
      className="final-text"
      animate={{
        y: [0, -6, 0],
        opacity: [1, 0.95, 1]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 3   // wait until entry animation finishes
      }}
    >
      Be my Valentine 💗 <br /><br />
      Today, tomorrow, and always...
    </motion.h1>

    <motion.img
      src={img26}
      alt="Final moment"
      className="final-image"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 3,
        ease: "easeOut",
        delay: 1.5
      }}
    />
  </motion.div>
)}




      <AnimatePresence mode="wait" >
        {!showFinal && chapterIndex < chapters.length && (
          <motion.div
            key={chapterIndex}
            className="chapter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <motion.h2
              className="chapter-caption"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1 }}
            >
              {chapters[chapterIndex].caption}
            </motion.h2>

            <div className="photos-grid">
              {chapters[chapterIndex].images.map((img, index) => (
                <FloatingPhoto
                  key={index}
                  src={img}
                  delay={index * 0.5}
                  gap={index === 0 ? 0 : 15}
                />
              ))}
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default MemoryMontage;
