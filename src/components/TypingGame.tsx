"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

const WORDS = [
  "twice", "once", "fancy", "feel", "special", "cheer", "up", "like", "ooh", "ahh",
  "signal", "heart", "shaker", "dance", "night", "away", "yes", "or", "more",
  "alcohol", "free", "scientist", "talk", "that", "moonlight", "sunrise", "candy", "pop",
  "jihyo", "nayeon", "jeongyeon", "momo", "sana", "mina", "dahyun", "chaeyoung", "tzuyu",
  "love", "music", "kpop", "idol", "stage", "performance", "fandom", "lightstick"
];

const GAME_DURATION = 60;

const TypingGame: React.FC = () => {
  const [words, setWords] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const shuffleWords = useCallback(() => {
    const shuffled = [...WORDS].sort(() => Math.random() - 0.5);
    setWords(shuffled);
  }, []);

  useEffect(() => {
    shuffleWords();
  }, [shuffleWords]);

  useEffect(() => {
    if (isGameActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsGameActive(false);
      setIsGameFinished(true);
    }
  }, [isGameActive, timeLeft]);

  const startGame = () => {
    setIsGameActive(true);
    setIsGameFinished(false);
    setTimeLeft(GAME_DURATION);
    setCorrectWords(0);
    setIncorrectWords(0);
    setCurrentWordIndex(0);
    setCurrentInput('');
    shuffleWords();
    if (inputRef.current) inputRef.current.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isGameActive && !isGameFinished) {
      setIsGameActive(true);
    }
    
    if (isGameFinished) return;

    const value = e.target.value;
    
    if (value.endsWith(' ')) {
      const wordToCheck = value.trim();
      const currentTargetWord = words[currentWordIndex];
      
      if (wordToCheck === currentTargetWord) {
        setCorrectWords((prev) => prev + 1);
      } else {
        setIncorrectWords((prev) => prev + 1);
      }
      
      setCurrentWordIndex((prev) => prev + 1);
      setCurrentInput('');
    } else {
      setCurrentInput(value);
    }
  };

  const calculateWPM = () => {
    return Math.round((correctWords / (GAME_DURATION - timeLeft)) * 60) || 0;
  };

  const calculateAccuracy = () => {
    const total = correctWords + incorrectWords;
    return total === 0 ? 100 : Math.round((correctWords / total) * 100);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto space-y-8">
      {/* Header / Stats */}
      <div className="flex justify-between w-full px-4 py-2 bg-white/50 rounded-2xl backdrop-blur-sm shadow-sm">
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-deep-purple/60 uppercase tracking-wider">Time</span>
          <span className="text-2xl font-black text-neon-magenta">{timeLeft}s</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-deep-purple/60 uppercase tracking-wider">WPM</span>
          <span className="text-2xl font-black text-deep-purple">{isGameFinished ? Math.round((correctWords / GAME_DURATION) * 60) : calculateWPM()}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-deep-purple/60 uppercase tracking-wider">Accuracy</span>
          <span className="text-2xl font-black text-apricot">{calculateAccuracy()}%</span>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative w-full min-h-[200px] bg-white rounded-3xl shadow-inner p-8 flex flex-wrap content-start gap-3 overflow-hidden border-2 border-soft-pink/50" onClick={() => inputRef.current?.focus()}>
        {isGameFinished ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 z-20 animate-fade-in">
            <h2 className="text-3xl font-bold text-deep-purple mb-2">Game Over!</h2>
            <p className="text-lg text-gray-600 mb-6">You typed <span className="font-bold text-neon-magenta">{correctWords}</span> words correctly.</p>
            <button 
              onClick={startGame}
              className="px-8 py-3 bg-gradient-to-r from-neon-magenta to-apricot text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Play Again
            </button>
          </div>
        ) : (
          words.slice(currentWordIndex, currentWordIndex + 20).map((word, index) => {
            const isCurrent = index === 0;
            return (
              <span 
                key={index} 
                className={`text-2xl transition-all duration-200 ${
                  isCurrent 
                    ? 'text-neon-magenta font-bold scale-110 bg-soft-pink/30 px-2 rounded-lg' 
                    : 'text-gray-400'
                }`}
              >
                {word}
              </span>
            );
          })
        )}
        
        {/* Hidden Input */}
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          className="absolute opacity-0 top-0 left-0 w-full h-full cursor-default"
          autoFocus
          onBlur={() => !isGameFinished && inputRef.current?.focus()}
        />
      </div>

      {/* Current Input Display (Optional, for visual feedback) */}
      <div className="h-12 w-full max-w-md">
        {!isGameFinished && (
          <div className="w-full text-center">
             <span className="text-3xl font-bold text-deep-purple border-b-2 border-apricot pb-1 min-w-[20px] inline-block">
               {currentInput}
               <span className="animate-pulse text-neon-magenta">|</span>
             </span>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="text-center text-deep-purple/50 text-sm font-medium">
        <p>Type the words and press <kbd className="px-2 py-1 bg-white rounded-md shadow-sm text-xs mx-1">Space</kbd> to advance.</p>
      </div>
    </div>
  );
};

export default TypingGame;
