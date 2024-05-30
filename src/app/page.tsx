"use client"

import { useState } from 'react';

const Home = () => {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog. This is a basic implementation to get you started. You can expand and refine this application by adding more features, such as user authentication, detailed result analysis, different text samples, and more advanced UI elements.');
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!startTime) {
      setStartTime(new Date());
    }
    setInput(e.target.value);
    calculateStats(e.target.value);
  };

  const calculateStats = (currentInput: string) => {
    const wordsTyped = currentInput.split(' ').length;
    const timeElapsed = (new Date().getTime() - (startTime?.getTime() || 0)) / 1000 / 60; // in minutes
    setWpm(Math.round(wordsTyped / timeElapsed));
    const correctChars = currentInput.split('').filter((char, index) => char === text[index]).length;
    setAccuracy(Math.round((correctChars / text.length) * 100));
  };

  return (
    <div>
      <h1>Typing Test</h1>
      <p>{text}</p>
      <textarea value={input} onChange={handleChange} className='w-full'></textarea>
      <p>WPM: {wpm}</p>
      <p>Accuracy: {accuracy}%</p>
    </div>
  );
};

export default Home;

//import styles from './page.module.css'
