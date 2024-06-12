"use client"

import { useState, useEffect, useRef } from "react";
import { isMobile } from "@/utils/detectDevice";
import { words } from "@/utils/words";
import ScoreDisplay from "./ScoreDisplay";

const GameComponent = () => {

    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [input, setInput] = useState("");
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [wpm, setWpm] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<number>(60);
    const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      setIsMobileDevice(isMobile());
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);

    useEffect(() => {
      const getData = async () => {
        const response = await fetch("http://localhost:3000/api/get-results/mobile");

        const data = await response.json();

        console.log(data);
      }

      getData();
    }, [])

    useEffect(() => {
      if (timeLeft > 0 && startTime) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else if (timeLeft === 0) {
        setIsGameOver(true);
      }
    }, [timeLeft, startTime]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!startTime) {
        setStartTime(new Date());
      }
      const value = e.target.value.trim();
      setInput(value);

      if (value === words[currentWordIndex]) {
        handleCorrectWord();
      }
    };

    const handleCorrectWord = () => {
      setCurrentWordIndex(currentWordIndex + 1);
      setInput("");
      calculateStats();
    };

    const calculateStats = () => {
      const wordsTyped = currentWordIndex + 1;
      setWpm(wordsTyped);
    };

    const handleClear = () => {
      setCurrentWordIndex(0);
      setInput("");
      setStartTime(null);
      setWpm(0);
      setTimeLeft(60);
      setIsGameOver(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }

    const renderText = () => {
      const currentWord = words[currentWordIndex];
      const renderedText = currentWord.split("").map((char, index) => {
        let color;
        if (index < input.length) {
          color = input[index] === char ? "text-green-800" : "text-red-800";
        } else {
          color = "text-gray-800";
        }
        return (
          <span key={index} className={`${color}`}>
            {char}
          </span>
        );
      });

      return renderedText;
    };

    const renderedDiv = isGameOver ? (
      <ScoreDisplay
        wpm={wpm}
        isMobileDevice={isMobileDevice}
        handleClear={handleClear}
      />
    ) : (
      <div
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
        className="cursor-text h-full flex flex-col justify-start items-center w-full max-w-4xl p-3"
      >
        <p className="text-lg font-semibold">TIME REMAINING</p>
        <p className="text-6xl font-semibold">{timeLeft}</p>
        <div className="text-8xl font-semibold p-4 tracking-wide">
          {renderText()}
        </div>
        <input
          ref={inputRef}
          value={input}
          onChange={handleChange}
          disabled={timeLeft === 0}
          className="rounded-full bg-white mt-6 py-4 px-6 outline-none w-full max-w-xl border border-slate-500 text-xl font-medium text-center"
          placeholder="Type the word shown above"
          autoFocus
        />
        <button
          onClick={handleClear}
          className="relative mt-6 flex py-2 text-white items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:bg-indigo-700 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            className="relative size-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          <span className="relative flex justify-center items-center space-x-1 text-sm font-semibold">
            Restart
          </span>
        </button>
      </div>
    );

    return renderedDiv;
}

export default GameComponent