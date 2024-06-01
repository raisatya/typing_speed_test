import React from 'react'

interface ScoreDisplayProps {
  wpm: number;
  accuracy: number;
  timeLeft: number;
  handleSubmit: () => void;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  wpm,
  accuracy,
  timeLeft,
  handleSubmit,
}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p>WPM: {wpm}</p>
      <p>Accuracy: {accuracy}%</p>
      <p>Time Left: {timeLeft} seconds</p>
      <button onClick={handleSubmit} disabled={timeLeft !== 0}>
        Submit
      </button>
    </div>
  );
};

export default ScoreDisplay