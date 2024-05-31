"use client"

import { useState, useEffect, useRef } from 'react';
import { isMobile } from '../utils/detectDevice';

const Home = () => {
  const [text, setText] =
    useState(`The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
`);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
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
    handleScroll();
  };

  const calculateStats = (currentInput: string) => {
    const wordsTyped = currentInput.split(' ').filter(word => word !== '').length;
    const timeElapsed = (new Date().getTime() - (startTime?.getTime() || 0)) / 1000 / 60; // in minutes
    setWpm(Math.round(wordsTyped / timeElapsed));
    const correctChars = currentInput.split('').filter((char, index) => char === text[index]).length;
    setAccuracy(Math.round((correctChars / text.length) * 100));
  };

  const handleScroll = () => {
    if (displayRef.current) {
      displayRef.current.scrollTop = displayRef.current.scrollHeight;
    }
  };

  const handleSubmit = async () => {
    const response = await fetch('/api/test-results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    setInput('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setTimeLeft(60);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const renderText = () => {
    const renderedText = text.split('').map((char, index) => {
      let color;
      if (index < input.length) {
        color = input[index] === char ? 'black' : 'red';
      } else {
        color = 'grey';
      }
      return (
        <span key={index} style={{ color }}>
          {char}
        </span>
      );
    });

    // Add the caret
    renderedText.splice(input.length, 0, <span key="caret" className="caret"></span>);

    return renderedText;
  };

  return (
    <div onClick={() => inputRef.current?.focus()} style={{ cursor: 'text', position: 'relative' }}>
      <h1>Typing Test</h1>
      {isMobileDevice ? (
        <p>This application is best experienced on a desktop device.</p>
      ) : (
        <>
          <div ref={displayRef} style={{ height: '60px', overflow: 'hidden', position: 'relative', whiteSpace: 'pre-wrap', wordWrap: 'break-word', fontSize: '18px', lineHeight: '1.5' }}>
            {renderText()}
          </div>
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleChange}
            disabled={timeLeft === 0}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '60px',
              width: '100%',
              fontSize: '18px',
              lineHeight: '1.5',
              opacity: 0,
              zIndex: -1,
            }}
            autoFocus
          ></textarea>
          <p>WPM: {wpm}</p>
          <p>Accuracy: {accuracy}%</p>
          <p>Time Left: {timeLeft} seconds</p>
          <button onClick={handleSubmit} disabled={timeLeft !== 0}>Submit</button>
        </>
      )}
      <style jsx>{`
        .caret {
          display: inline-block;
          width: 2px;
          height: 1em;
          background-color: black;
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          from, to {
            background-color: transparent;
          }
          50% {
            background-color: black;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
