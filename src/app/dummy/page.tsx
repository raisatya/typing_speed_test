"use client";
import { useState, useEffect, useRef } from "react";
import { isMobile } from "../../utils/detectDevice";
import ScoreDisplay from "../components/ScoreDisplay"; // Import the ScoreDisplay component
import Navbar from "../components/Navbar";

const Home = () => {
  const [text, setText] = useState(
    "Every person desires growth, aiming higher goals within career paths. People manage duties, facing stress daily. Amid hectic rhythms, many forget simple joys. Smiles brighten gloomy moods, sparking hope within. wonders offer soothing escape. Forests, rivers, meadows bring peaceful moments. Cities buzz loudly, demanding focus. Hustle remains constant, draining energy. Friends provide comfort, sharing stories, laughter echoing warmly. Books capture dreams, unlocking worlds unknown. Authors craft tales, weaving magic, enchanting readers deeply. Travel broadens horizons, exploring diverse cultures. Journeying afar, meeting strangers, embracing differences. Cuisine tempts palates, savoring unique flavors. Music soothes souls, melodies floating gently. Art inspires creativity, colors blending beautifully. Technology advances rapidly, transforming society. Innovations emerge, enhancing lifestyles significantly. Fitness maintains health, strengthening bodies. Exercise routines vary, ensuring balanced workouts. Minds sharpen through puzzles, challenging intellects. Family bonds tighten, fostering support. Celebrations unite relatives, marking milestones proudly. Holidays provide breaks, allowing relaxation. Memories linger, cherished forever. Emotions fluctuate, expressing genuine feelings. Kindness spreads joy, touching hearts profoundly. Pets bring companionship, comforting presence. Life's journey unfolds, presenting opportunities constantly. Choices shape destinies, steering futures wisely. Embrace every moment, cherishing experiences wholly. Achievements reflect perseverance, showcasing dedication clearly. Finally, remember balance sustains harmony, nurturing wellbeing consistently."
  );
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
  const prevHeightRef = useRef<number>(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobileDevice(isMobile());
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && startTime) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setInput("");
      setStartTime(null);
      setWpm(0);
      setAccuracy(100);
      setTimeLeft(60);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [timeLeft, startTime]);

    const handleScroll = () => {
      if (inputRef.current && displayRef.current) {
        displayRef.current.scrollTop += 20; // Scroll down by 40 pixels
      }
    };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!startTime) {
      setStartTime(new Date());
    }
    const value = e.target.value;
    setInput(value);
    calculateStats(value);
    handleScroll();
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
/*
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
*/
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

    // Add the caret
    renderedText.splice(
      input.length,
      0,
      <span key="caret" className="caret text-5xl">|</span>
    );

    return renderedText;
  };

  return (
    <div className="h-screen max-w-8xl w-full">
      <Navbar/>
      <div
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });
          }
        }}
        style={{ cursor: "text", position: "relative" }}
        className="cursor-text relative h-full w-full"
      >
        <h1>Typing Test</h1>
        <>
          <div
            ref={displayRef}
            className="relative overflow-scroll max-h-80 whitespace-pre-wrap break-words text-4xl leading-12"
          >
            {renderText()}
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleChange}
              disabled={timeLeft === 0}
              className="absolute top-0 left-0 w-full h-full py-5 opacity-0 text-4xl leading-12 -z-10"
              autoFocus
            ></textarea>
          </div>
        </>
        <style jsx>{`
          .caret {
            display: inline-block;
            width: 2px;
            height: 1em;
            background-color: black;
            animation: blink 1s step-end infinite;
          }

          @keyframes blink {
            from,
            to {
              background-color: transparent;
            }
            50% {
              background-color: black;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Home;
