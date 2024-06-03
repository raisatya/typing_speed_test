"use client";

import { useState, useEffect, useRef } from "react";
import { isMobile } from "@/utils/detectDevice";
import Navbar from "./components/Navbar";

const Home = () => {
  const [text, setText] = useState(
    "Every person desires growth, aiming higher goals within career paths. People manage duties, facing stress daily. Amid hectic rhythms, many forget simple joys. Smiles brighten gloomy moods, sparking hope within. Nature's wonders offer soothing escape. Forests, rivers, meadows bring peaceful moments. Cities buzz loudly, demanding focus. Hustle remains constant, draining energy. Friends provide comfort, sharing stories, laughter echoing warmly. Books capture dreams, unlocking worlds unknown. Authors craft tales, weaving magic, enchanting readers deeply. Travel broadens horizons, exploring diverse cultures. Journeying afar, meeting strangers, embracing differences. Cuisine tempts palates, savoring unique flavors. Music soothes souls, melodies floating gently. Art inspires creativity, colors blending beautifully. Technology advances rapidly, transforming society. Innovations emerge, enhancing lifestyles significantly. Fitness maintains health, strengthening bodies. Exercise routines vary, ensuring balanced workouts. Minds sharpen through puzzles, challenging intellects. Family bonds tighten, fostering support. Celebrations unite relatives, marking milestones proudly. Holidays provide breaks, allowing relaxation. Memories linger, cherished forever. Emotions fluctuate, expressing genuine feelings. Kindness spreads joy, touching hearts profoundly. Pets bring companionship, comforting presence. Life's journey unfolds, presenting opportunities constantly. Choices shape destinies, steering futures wisely. Embrace every moment, cherishing experiences wholly. Achievements reflect perseverance, showcasing dedication clearly. Finally, remember balance sustains harmony, nurturing wellbeing consistently."
  );
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && startTime) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, startTime]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!startTime) {
      setStartTime(new Date());
    }
    const value = e.target.value;
    setInput(value);
    calculateStats(value);
  };

  const calculateStats = (currentInput: string) => {
    const wordsTyped = currentInput
      .split(" ")
      .filter((word) => word !== "").length;
    const timeElapsed =
      (new Date().getTime() - (startTime?.getTime() || 0)) / 1000 / 60; // in minutes
    setWpm(Math.round(wordsTyped / timeElapsed));
    const correctChars = currentInput
      .split("")
      .filter((char, index) => char === text[index]).length;
    setAccuracy(Math.round((correctChars / text.length) * 100));
  };

  const handleSubmit = async () => {
    const response = await fetch("/api/test-results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 1, // Replace with dynamic user ID
        wpm,
        accuracy,
      }),
    });
    const data = await response.json();
    console.log(data);
    // Reset the test
    setInput("");
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setTimeLeft(60);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const renderText = () => {
    const renderedText = text.split("").map((char, index) => {
      let color;
      if (index < input.length) {
        color = input[index] === char ? "black" : "red";
      } else {
        color = "grey";
      }
      return (
        <span key={index} style={{ color }}>
          {char}
        </span>
      );
    });

    return renderedText;
  };

  return (
    <>
      <Navbar />
      <div
        onClick={() => inputRef.current?.focus()}
        className="cursor-text text-center"
      >
        <h1>Typing Test</h1>
        <p>Time Left: {timeLeft} seconds</p>
        <div
          style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            fontSize: "18px",
            lineHeight: "1.5",
          }}
        >
          {renderText()}
        </div>
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleChange}
          disabled={timeLeft === 0}
          style={{
            position: "absolute",
            zIndex: -1,
          }}
          autoFocus
        ></textarea>
        <p>WPM: {wpm}</p>
        <p>Accuracy: {accuracy}%</p>
        <button onClick={handleSubmit} disabled={timeLeft !== 0}>
          Submit
        </button>
      </div>
    </>
  );
};

export default Home;


//To do
/*
  Create Navbar and its components
  Make full page text
  Floating buttons for restart
  Another div for results and submit
*/