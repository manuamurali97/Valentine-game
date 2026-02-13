import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingPhoto from "./FloatingPhoto";

/* IMPORT YOUR 27 IMAGES */
import img1 from "../assets/memories/img1.png";
import img2 from "../assets/memories/img2.png";
import img3 from "../assets/memories/img3.png";
import img4 from "../assets/memories/img4.png";
import img5 from "../assets/memories/img6.png";
import img6 from "../assets/memories/img5.png";
import img7 from "../assets/memories/img7.png";
import img8 from "../assets/memories/img8.png";
import img9 from "../assets/memories/img10.png";
import img10 from "../assets/memories/img9.png";
import img11 from "../assets/memories/img11.png";
import img12 from "../assets/memories/img12.png";
import img13 from "../assets/memories/img8new.png";
import img14 from "../assets/memories/img14.png";
import img15 from "../assets/memories/img15.png";
import img16 from "../assets/memories/img16.png";
import img17 from "../assets/memories/img17.png";
import img18 from "../assets/memories/img18.png";
import img19 from "../assets/memories/img19.png";
import img20 from "../assets/memories/img20.png";
import img21 from "../assets/memories/img21.png";
//import img22 from "../assets/memories/img22.png";
import img23 from "../assets/memories/img23.png";
import img24 from "../assets/memories/img24.png";
import img25 from "../assets/memories/img25.png";
import img26 from "../assets/memories/img26.png";
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
      setTimeout(() => setShowFinal(true), 1000);
      return;
    }

    const timer = setTimeout(() => {
      setChapterIndex(prev => prev + 1);
    }, 10000); // 11 seconds per chapter

    return () => clearTimeout(timer);
  }, [chapterIndex]);

  return (
    <div className="montage-container">

      {/* FINAL MESSAGE */}
      {showFinal && (
        <motion.div
          className="final-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <h1 className="final-message">
      Be my Valentine 💗 <br/> <br/>Today, tomorrow, and always...
    </h1>
         <motion.img
      src={img26}
      alt="Final moment"
      className="final-image"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 2,
        ease: "easeOut",
        delay: 1
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
                  delay={index * 0.5} // Stagger photos by 1.5s
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
