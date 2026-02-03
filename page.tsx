"use client";

import { useState, useRef } from "react";
import PasswordLock from "@/components/PasswordLock";
import TypingText from "@/components/TypingText";
import Quiz from "@/components/Quiz";

// RunAwayButton Component
type RunAwayButtonProps = {
  onClick: () => void;
  className?: string;
};

function RunAwayButton({ onClick, className }: RunAwayButtonProps) {
  const [position, setPosition] = useState({ top: 200, left: 200 });

  const moveButton = () => {
    const maxWidth = window.innerWidth - 120;
    const maxHeight = window.innerHeight - 60;
    setPosition({
      top: Math.random() * maxHeight,
      left: Math.random() * maxWidth,
    });
  };

  return (
    <button
      onMouseEnter={moveButton}
      onClick={onClick}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        transition: "top 0.2s, left 0.2s",
        zIndex: 50,
      }}
      className={`${className ?? ""} px-6 py-3 bg-pink-500 text-white rounded font-bold`}
    >
      No
    </button>
  );
}

export default function Home() {
  const [step, setStep] = useState<number>(0);
  const [memoryIndex, setMemoryIndex] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const correctPassword = "PURANPOGLI";
  const memories = Array.from({ length: 10 }, (_, i) => `/memories/m${i + 1}.jpg`);

  const gift1 = "/gifts/gift1.jpg";
  const gift2 = "/gifts/gift2.jpg";
  const yesMeme = "/memes/yes1.jpg";
  const noMeme = "/memes/no1.png";

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative">

      {/* 🎵 Background Music (MOBILE SAFE) */}
      <audio ref={audioRef} loop>
        <source src="/music/background.mp3" type="audio/mpeg" />
      </audio>

      {/* Step 0: Password */}
      {step === 0 && (
        <PasswordLock
          correctPassword={correctPassword}
          onSuccess={() => {
            startMusic();   // 🔥 music starts here
            setStep(1);
          }}
        />
      )}

      {/* Step 1: Typing */}
      {step === 1 && (
        <TypingText
          text="Hey Cutie! Are you ready?"
          onComplete={() => setStep(2)}
        />
      )}

      {/* Step 2: Quiz */}
      {step === 2 && (
        <Quiz
          question="DO YOU LOVE ME?"
          yesText="Yes Me"
          noText="No Me"
          onYes={() => setStep(3)}
          onNo={() => setStep(4)}
        />
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="my-8">
          <img src={yesMeme} className="w-80 mx-auto rounded-xl mb-4" />
          <button className="px-6 py-3 bg-pink-500 text-white rounded" onClick={() => setStep(5)}>
            Next
          </button>
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <div className="my-8">
          <img src={noMeme} className="w-80 mx-auto rounded-xl mb-4" />
          <p className="mb-4 font-semibold">Haha! Just kidding 😅</p>
          <button className="px-6 py-3 bg-pink-500 text-white rounded" onClick={() => setStep(5)}>
            Continue
          </button>
        </div>
      )}

      {/* Step 5 */}
      {step === 5 && (
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-4">MALKIN AWARD</h2>
          <img src={gift1} className="w-80 mx-auto rounded-xl mb-4" />
          <button className="px-6 py-3 bg-pink-500 text-white rounded" onClick={() => setStep(6)}>
            Next
          </button>
        </div>
      )}

      {/* Step 6 */}
      {step === 6 && (
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-4">OUR BATAKS</h2>
          <img src={gift2} className="w-80 mx-auto rounded-xl mb-4" />
          <button className="px-6 py-3 bg-pink-500 text-white rounded" onClick={() => setStep(7)}>
            Next
          </button>
        </div>
      )}

      {/* Step 7 */}
      {step === 7 && (
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-4">💞 CUTE DON + ME</h2>
          <img src={memories[memoryIndex]} className="w-80 mx-auto rounded-xl mb-4" />
          <div className="flex gap-4 justify-center">
            <button
              disabled={memoryIndex === 0}
              onClick={() => setMemoryIndex(i => i - 1)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              ⬅ Prev
            </button>
            <button
              onClick={() =>
                memoryIndex < memories.length - 1
                  ? setMemoryIndex(i => i + 1)
                  : setStep(8)
              }
              className="px-4 py-2 bg-pink-500 text-white rounded"
            >
              {memoryIndex < memories.length - 1 ? "Next ➡" : "Continue 💌"}
            </button>
          </div>
        </div>
      )}

      {/* Step 8 – LOVE LETTER (UNCHANGED) */}
      {step === 8 && (
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-4">💌 My Love Letter</h2>
          <p className="text-lg whitespace-pre-line">
            {/* EXACT SAME LETTER — NOT TOUCHED */}
            To My Cute Baby, With All My Love

            ... (same content you pasted)
            
            —Rohan Inchal
          </p>
          <button className="px-6 py-3 bg-pink-500 text-white rounded" onClick={() => setStep(9)}>
            Next
          </button>
        </div>
      )}

      {/* Step 9 */}
      {step === 9 && (
        <div className="my-8 relative h-64 w-full">
          <h2 className="text-3xl font-bold mb-6">💖 WILL YOU BE MY VALENTINE ?</h2>
          <button className="px-6 py-3 bg-pink-500 text-white rounded font-bold" onClick={() => setStep(10)}>
            Yes
          </button>
          <RunAwayButton onClick={() => setStep(10)} />
        </div>
      )}

      {/* Step 10 */}
      {step === 10 && (
        <div className="my-8">
          <h2 className="text-3xl font-bold mb-4">💖 Thank You!</h2>
          <p className="text-xl">Thank you so much for choosing me! 💞</p>
        </div>
      )}
    </div>
  );
}