import { useState, useRef, useMemo, useEffect } from "react";
import "./App.css";

import LevelOne from "./components/LevelOne";
import LevelTwo from "./components/LevelTwo";
import MemoryMontage from "./components/MemoryMontage";

import petalImage from "./assets/petals.png";
import romanticMusic from "./assets/romanticMusic.mp3";

function App() {
  const [stage, setStage] = useState(1);
  const audioRef = useRef(null);
  const [petals, setPetals] = useState([]);

  useEffect(() => {
  if (stage < 2) return;

  const interval = setInterval(() => {
    const newPetal = {
      id: Date.now(),
      left: Math.random() * 100,
      size: 20 + Math.random() * 15,
      duration: stage === 2
        ? 10 + Math.random() * 6   // normal speed
        : 16 + Math.random() * 6  // slower in montage
    };

    setPetals(prev => [...prev, newPetal]);

    // Remove after fall completes
    setTimeout(() => {
      setPetals(prev =>
        prev.filter(p => p.id !== newPetal.id)
      );
    }, newPetal.duration * 1500);

  }, stage === 2 ? 1500 : 3000); // slower spawn in montage

  return () => clearInterval(interval);
}, [stage]);


  /* ---------------- BACKGROUND HEARTS ---------------- */
  const backgroundHearts = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 16 + Math.random() * 20,
      duration: 14 + Math.random() * 6
    }));
  }, []);

  /* ---------------- MUSIC FADE-IN ON LEVEL 2 ---------------- */
  useEffect(() => {
    if (stage === 2 && audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch(() => {});

      let vol = 0;
      const fadeIn = setInterval(() => {
        if (vol < 0.6) {
          vol += 0.05;
          audioRef.current.volume = vol;
        } else {
          clearInterval(fadeIn);
        }
      }, 200);

      return () => clearInterval(fadeIn);
    }
  }, [stage]);

  return (
    <div className="app">

      {/* Background Floating Hearts */}
      {backgroundHearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-bg"
          style={{
            left: heart.left + "vw",
            animationDuration: heart.duration + "s",
            fontSize: heart.size + "px"
          }}
        >
          💗
        </div>
      ))}

      {/* 🎬 STAGE RENDERING */}
      {stage === 1 && (
        <LevelOne setStage={setStage} />
      )}

      {/* 🌹 Falling Petals */}
      {petals.map((petal) => (
        <img
          key={petal.id}
          src={petalImage}
          alt="petal"
          className="petal"
          style={{
            left: petal.left + "vw",
            width: petal.size + "px",
            animationDuration: petal.duration + "s"
          }}
        />
      ))}


      {stage === 2 && (
        <LevelTwo setStage={setStage} />
      )}

      {stage === 3 && (
        <MemoryMontage setStage={setStage} />
      )}

      {/* 🎵 Background Music */}
      <audio ref={audioRef} src={romanticMusic} loop />

    </div>
  );
}

export default App;
